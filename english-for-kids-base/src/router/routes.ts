import { getKebabCaseString } from '../helpers/utils';
import { RouteModel } from '../models/route-model';
import { MainPage } from '../pages/main/main';
import { Category } from '../pages/category/category';
import { getCategoryNames } from '../services/cards-services';
import { Statistics } from '../pages/statistics/statistics';
import { DifficultWords } from '../pages/repeat/repeat';

function getCategoryRoutes() {
  const categoryNames = getCategoryNames();

  const categoryRoutes = categoryNames.map((categoryName) => {
    return {
      name: categoryName,
      path: getKebabCaseString(categoryName),
      Page: Category,
      menu: true,
    };
  });

  return categoryRoutes;
}

export const routes: RouteModel[] = [
  { name: 'Main Page', path: '', Page: MainPage, menu: true },
  ...getCategoryRoutes(),
  { name: 'Statistics', path: 'statistics', Page: Statistics, menu: true },
  { name: 'Repeat', path: 'difficult-words', Page: DifficultWords, menu: false },
];
