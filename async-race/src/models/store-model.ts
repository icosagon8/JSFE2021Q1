import { CarModel } from './car-model';
import { RequestFrame } from './request-frame-model';

export interface StoreModel {
  cars: CarModel[];
  carsNumber: number;
  page: number;
  selectedCar: CarModel | null;
  carsRequestId: Record<string, RequestFrame>;
}
