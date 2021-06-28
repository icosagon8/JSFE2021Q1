import { CardWord } from '../components/card-word/card-word';
import { CardsField } from '../components/cards-field/cards-field';
import { Component } from '../components/component';
import { RootElement } from '../models/root-element-model';
import { getWordsData } from '../services/cards-services';
import { store } from '../store/store';

export class Category extends Component {
  cardsField: CardsField;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.cardsField = new CardsField(this.element, 'words');
    this.addCategoryCards();
  }

  addCategoryCards(): void {
    const category = store.getState().page;
    const wordsData = getWordsData(category);
    wordsData.forEach((wordData) => new CardWord(this.cardsField.container.element, wordData));
  }
}
