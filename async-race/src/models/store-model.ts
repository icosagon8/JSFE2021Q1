import { CarModel } from './car-model';
import { RequestFrame } from './request-frame-model';
import { WinnerModel } from './winner-model';
import { WinnerOrder } from './winner-order-model';
import { WinnerSort } from './winner-sort-model';

export interface StoreModel {
  cars: CarModel[];
  carsNumber: number;
  garagePage: number;
  winners: WinnerModel[];
  winnersNumber: number;
  winnersPage: number;
  selectedCar: CarModel | null;
  carsRequestId: Record<string, RequestFrame>;
  sort: WinnerSort;
  order: WinnerOrder;
}
