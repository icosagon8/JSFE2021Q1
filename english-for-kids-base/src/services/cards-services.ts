import { cards } from '../data/cards';
import { CategoryDataModel } from '../models/category-data-model';

export const getCategoryData = (): CategoryDataModel[] => {
  return cards.map((item) => item.category);
};

export const getCategoryNames = (): string[] => cards.map((item) => item.category.name);
