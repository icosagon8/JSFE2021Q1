import { getKebabCaseString } from '../helpers/utils';
import { RouteModel } from '../models/route-model';
import { MainPage } from '../pages/main/main';
import { Category } from '../pages/category/category';
import { getCategoriesData } from '../services/api';
import { Statistics } from '../pages/statistics/statistics';
import { DifficultWords } from '../pages/repeat/repeat';
import { Admin } from '../pages/admin/admin';

async function getCategoryRoutes() {
  const categoriesData = await getCategoriesData();
  const categoryRoutes = categoriesData.map((categoryName) => {
    return {
      name: categoryName.category,
      path: getKebabCaseString(categoryName.category),
      Page: Category,
      menu: true,
      categoryId: categoryName.id,
    };
  });

  return categoryRoutes;
}

export async function getRoutes(): Promise<RouteModel[]> {
  const routes = [
    { name: 'Main Page', path: '', Page: MainPage, menu: true },
    ...(await getCategoryRoutes()),
    { name: 'Statistics', path: 'statistics', Page: Statistics, menu: true },
    { name: 'Repeat', path: 'difficult-words', Page: DifficultWords, menu: false },
    { name: 'Admin', path: 'admin', Page: Admin, menu: true },
  ];

  return routes;
}
