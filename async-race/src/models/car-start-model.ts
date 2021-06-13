import { CarStatusModel } from './car-drive-mode-model';

export interface CarStartModel {
  id: number;
  time: number;
  driveRequest: CarStatusModel;
}
