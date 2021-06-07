import { getCars } from './api';

const { cars, count: carsNumber } = await getCars(1);

export const store = {
  cars,
  carsNumber,
  page: 1,
};
