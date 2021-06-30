import './category.scss';
import { CardWord } from '../../components/card-word/card-word';
import { CardsField } from '../../components/cards-field/cards-field';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { getWordsData } from '../../services/cards-services';
import { store } from '../../store/store';

export class Category extends Component {
  cardsField: CardsField;

  startBtn: Component;

  cards: CardWord[];

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.cardsField = new CardsField(this.element, 'words');
    this.startBtn = new Component(this.cardsField.element, 'button', ['category__start-btn'], 'Start');
    this.cards = [];
    this.addCategoryCards();
  }

  addCategoryCards(): void {
    const { category } = store.getState().page;
    const wordsData = getWordsData(category);
    wordsData.forEach((wordData) => {
      const card = new CardWord(this.cardsField.container.element, wordData);
      this.cards.push(card);
    });
  }
}
