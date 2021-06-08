import { CarModel } from './car-model';

export interface StoreModel {
  cars: CarModel[];
  carsNumber: number;
  page: number;
  selectedCar: CarModel | null;
}
