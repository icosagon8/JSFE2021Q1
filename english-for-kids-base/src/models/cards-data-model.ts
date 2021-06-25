import { CategoryDataModel } from './category-data-model';
import { WordDataModel } from './word-data-model';

export interface CardsDataModel {
  category: CategoryDataModel;
  words: WordDataModel[];
}
