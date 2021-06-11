import { getCars } from './api';
import { StoreModel } from './models/store-model';

const { cars, count: carsNumber } = await getCars(1);

export const store: StoreModel = {
  cars,
  carsNumber,
  page: 1,
  selectedCar: null,
  carsRequestId: {},
};

export const updateGarageState = async (): Promise<void> => {
  const { cars: carsArray, count: carsCount } = await getCars(store.page);
  store.cars = carsArray;
  store.carsNumber = carsCount;
};
