import { getCars, getWinners } from './api';
import { StoreModel } from './models/store-model';

const { cars, count: carsNumber } = await getCars(1);

const { winnersWithCars: winners, count: winnersNumber } = await getWinners(1);

export const store: StoreModel = {
  cars,
  carsNumber,
  garagePage: 1,
  winners,
  winnersNumber,
  winnersPage: 1,
  selectedCar: null,
  carsRequestId: {},
};

export const updateGarageState = async (): Promise<void> => {
  const { cars: carsArray, count: carsCount } = await getCars(store.garagePage);
  store.cars = carsArray;
  store.carsNumber = carsCount;
};

export const updateWinnersState = async (): Promise<void> => {
  const { winnersWithCars, count } = await getWinners(store.winnersPage);
  store.winners = winnersWithCars;
  store.winnersNumber = count;
};
