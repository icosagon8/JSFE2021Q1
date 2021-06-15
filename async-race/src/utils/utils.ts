import { driveCar, startEngine, stopEngine } from '../api';
import { CarStartModel } from '../models/car-start-model';
import { CarWriteModel } from '../models/car-write-model';
import { RequestFrame } from '../models/request-frame-model';
import { WinnerSort } from '../models/winner-sort-model';
import { store, updateWinnersState } from '../store';

const getRandom = (array: string[] | string) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomCarName = (): string => {
  const BRAND = ['Ford', 'Honda', 'Mazda', 'Mitsubishi', 'Toyota', 'Dodge', 'Lamborghini', 'BMW', 'Porsche', 'Nissan'];
  const MODEL = ['Mustang', 'Civic', 'RX-7', 'Eclipse', 'Supra', 'Viper', 'Gallardo', 'M3 GTR', 'Cayman', 'Skyline'];

  return `${getRandom(BRAND)} ${getRandom(MODEL)}`;
};

export const getRandomHexColor = (): string => {
  const SYMBOLS = '0123456789ABCDEF';
  const COLOR_HEX_LENGTH = 6;
  let color = '#';

  for (let i = 0; i < COLOR_HEX_LENGTH; i++) {
    color += getRandom(SYMBOLS);
  }

  return color;
};

export const getRandomCars = (quantity: number): CarWriteModel[] => {
  const cars: CarWriteModel[] = [];

  for (let i = 0; i < quantity; i++) {
    cars.push({ name: getRandomCarName(), color: getRandomHexColor() });
  }

  return cars;
};

export const startAnimation = (car: Element | null | undefined, distance: number, time: number): RequestFrame => {
  let start: number;

  const requestFrame: RequestFrame = { requestID: 0 };

  const animate = (timeStamp: number) => {
    if (!start) start = performance.now();
    const coveredDistance = (distance / time) * (timeStamp - start);
    if (car) (car as HTMLElement).style.left = `${Math.min(coveredDistance, distance)}px`;
    if (coveredDistance < distance) requestFrame.requestID = requestAnimationFrame(animate);
  };

  requestFrame.requestID = requestAnimationFrame(animate);

  return requestFrame;
};

export const start = async (id: number): Promise<CarStartModel> => {
  const carMovementCharcs = await startEngine(id);
  const time = carMovementCharcs.distance / carMovementCharcs.velocity;
  const road = document.querySelector(`.cars__item[data-car-id="${id}"] .cars__road`);
  const finish = road?.querySelector('.cars__finish');

  if (road && finish) {
    const distance = finish.getBoundingClientRect().right - road.getBoundingClientRect().left;
    const car = road.querySelector('.car');
    store.carsRequestId[id] = startAnimation(car, distance, time);
  }

  const driveRequest = await driveCar(id);
  if (driveRequest.success === false) cancelAnimationFrame(store.carsRequestId[id].requestID);

  return { id, time, driveRequest };
};

export const defineWinner = async (prom: Promise<CarStartModel>[]): Promise<CarStartModel | null> => {
  const cars = await Promise.all(prom);
  const finishingCars = cars.filter((car) => car.driveRequest.success);
  const winner = finishingCars.length > 0 ? finishingCars.reduce((a, b) => (a.time < b.time ? a : b)) : null;

  return winner;
};

export const race = async (): Promise<CarStartModel | null> => {
  const { cars } = store;
  const carsPromises = cars.map(async (car) => start(car.id));
  const raceWinner = await defineWinner(carsPromises);

  return raceWinner;
};

export const stop = async (id: number): Promise<void> => {
  const car = document.querySelector(`.cars__item[data-car-id="${id}"]`);
  const startBtn = car?.querySelector('.cars__start-btn');
  const stopBtn = car?.querySelector('.cars__stop-btn');
  const carImage = car?.querySelector('.car');
  if (stopBtn) stopBtn.setAttribute('disabled', '');
  if (startBtn) startBtn.removeAttribute('disabled');
  await stopEngine(id);
  cancelAnimationFrame(store.carsRequestId[id].requestID);
  if (carImage) (carImage as HTMLElement).style.left = '0px';
};

export const reset = (): void => {
  const { cars } = store;
  cars.map((car) => stop(car.id));
};

export const sortTable = async (sort: WinnerSort): Promise<void> => {
  store.sort = sort;
  store.order = store.order === 'ASC' ? 'DESC' : 'ASC';
  await updateWinnersState();
};

export const controlSortTriangle = (tableHeaderCell: HTMLElement): void => {
  if (store.order === 'ASC') {
    tableHeaderCell.classList.remove('sorted');
    tableHeaderCell.classList.add('sorted-reverse');
  } else {
    tableHeaderCell.classList.add('sorted');
    tableHeaderCell.classList.remove('sorted-reverse');
  }
};
