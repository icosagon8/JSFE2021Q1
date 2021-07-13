import { CategoryCreateData } from '../models/category-create-data';
import { CategoryDataModel } from '../models/category-data-model';
import { CategoryUpdateData } from '../models/category-update-data';
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

export const deleteCategory = async (categoryId: string): Promise<CategoryDataModel> => {
  const response = await fetch(`${baseUrl}${paths.categories}/${categoryId}`, {
    method: 'DELETE',
  });

  const category: CategoryDataModel = await response.json();

  return category;
};

export const updateCategory = async (categoryId: string, body: CategoryUpdateData): Promise<CategoryDataModel> => {
  const response = await fetch(`${baseUrl}${paths.categories}/${categoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const category = await response.json();

  return category;
};

export const createCategory = async (body: CategoryCreateData): Promise<CategoryDataModel> => {
  const response = await fetch(`${baseUrl}${paths.categories}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const category = await response.json();

  return category;
};
