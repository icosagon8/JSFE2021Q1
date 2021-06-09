import { CarModel } from '../models/car-model';

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

export const getRandomCars = (quantity: number): CarModel[] => {
  const cars: CarModel[] = [];

  for (let i = 0; i < quantity; i++) {
    cars.push({ name: getRandomCarName(), color: getRandomHexColor() });
  }

  return cars;
};
