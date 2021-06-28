import { cards } from '../data/cards';
import { WordDataModel } from '../models/word-data-model';

export const getCategoryNames = (): string[] => cards.map((item) => item.category);

export const getCategoryImage = (category: string): string => {
  const categorySet = cards.filter((set) => set.category === category);
  const categoryImage = categorySet.map((set) => set.image).join('');

  return categoryImage;
};

export const getWordsData = (category: string): WordDataModel[] => {
  const categorySet = <WordDataModel[]>cards.find((set) => set.category === category)?.words;

  return categorySet;
};
