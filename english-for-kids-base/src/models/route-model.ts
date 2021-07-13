import { Category } from '../pages/category/category';
import { MainPage } from '../pages/main/main';
import { Statistics } from '../pages/statistics/statistics';
import { Admin } from '../pages/admin/admin';

export interface RouteModel {
  name: string;
  path: string;
  Page: typeof MainPage | typeof Category | typeof Statistics | typeof Admin;
  menu: boolean;
  categoryId?: string;
}
