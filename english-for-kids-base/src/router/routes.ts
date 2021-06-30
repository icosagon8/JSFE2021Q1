import { getKebabCaseString } from '../helpers/utils';
import { RouteModel } from '../models/route-model';
import { MainPage } from '../pages/main/main';
import { Category } from '../pages/category/category';
import { getCategoryNames } from '../services/cards-services';

function getCategoryRoutes() {
  const categoryNames = getCategoryNames();

  const categoryRoutes = categoryNames.map((categoryName) => {
    return {
      name: categoryName,
      path: getKebabCaseString(categoryName),
      Page: Category,
    };
  });

  return categoryRoutes;
}

export const routes: RouteModel[] = [{ name: 'Main Page', path: '', Page: MainPage }, ...getCategoryRoutes()];
