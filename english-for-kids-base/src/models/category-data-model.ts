import { WordDataModel } from './word-data-model';

export interface CategoryDataModel {
  category: string;
  image: string;
  words: WordDataModel[];
}
