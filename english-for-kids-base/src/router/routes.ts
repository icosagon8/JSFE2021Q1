import { MainPage } from '../pages/main';
import { getCategoryNames } from '../services/cards-services';

export const routes = [
  { name: 'Main Page', path: '', component: MainPage },
  { name: getCategoryNames(), path: 'category', component: MainPage },
  { name: 'Statistics', path: 'statistics', component: MainPage },
];
