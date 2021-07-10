import { Category } from '../pages/category/category';
import { MainPage } from '../pages/main/main';
import { Statistics } from '../pages/statistics/statistics';

export interface RouteModel {
  name: string;
  path: string;
  Page: typeof MainPage | typeof Category | typeof Statistics;
  menu: boolean;
  categoryId?: string;
}
