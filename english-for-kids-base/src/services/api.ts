import { CategoryDataModel } from '../models/category-data-model';
import { WordDataModel } from '../models/word-data-model';

const baseUrl = 'http://localhost:3000';

const paths = {
  categories: '/api/categories',
  words: '/api/words',
};

export const getCategoriesData = async (): Promise<CategoryDataModel[]> => {
  const response = await fetch(`${baseUrl}${paths.categories}`);
  const categoriesData: CategoryDataModel[] = await response.json();

  return categoriesData;
};

export const getCategoryWordsData = async (categoryId: string): Promise<WordDataModel[]> => {
  const response = await fetch(`${baseUrl}${paths.words}`);
  const wordsData: WordDataModel[] = await response.json();
  const categoryWords: WordDataModel[] = wordsData.filter((wordData) => wordData.categoryId === categoryId);

  return categoryWords;
};

export const getWordsData = async (): Promise<WordDataModel[]> => {
  const response = await fetch(`${baseUrl}${paths.words}`);
  const wordsData: WordDataModel[] = await response.json();

  return wordsData;
};

export const getWordData = async (wordId: string): Promise<WordDataModel> => {
  const response = await fetch(`${baseUrl}${paths.words}/${wordId}`);
  const wordData: WordDataModel = await response.json();

  return wordData;
};
