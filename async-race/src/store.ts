import { getCars } from './api';
import { StoreModel } from './models/store-model';

const { cars, count: carsNumber } = await getCars(1);

export const store: StoreModel = {
  cars,
  carsNumber,
  page: 1,
  selectedCar: null,
};
