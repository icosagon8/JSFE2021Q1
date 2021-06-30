import './category.scss';
import { Unsubscribe } from 'redux';
import { CardWord } from '../../components/card-word/card-word';
import { CardsField } from '../../components/cards-field/cards-field';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { getWordsData } from '../../services/cards-services';
import { store } from '../../store/store';
import { shuffleArray } from '../../helpers/utils';

export class Category extends Component {
  cardsField: CardsField;

  button: Component;

  cards: CardWord[];

  shuffleCards?: CardWord[];

  currentCard?: CardWord;

  unsubscribe: Unsubscribe;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.cardsField = new CardsField(this.element, 'words');
    this.button = new Component(this.cardsField.element, 'button', ['category__btn--start'], 'Start');
    this.cards = [];
    this.addCategoryCards();
    this.unsubscribe = store.subscribe(this.controlButtonState);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.button.element.addEventListener('click', this.startGame, { once: true });
    window.addEventListener('hashchange', () => this.unsubscribe(), { once: true });
  }

  addCategoryCards(): void {
    const { category } = store.getState().page;
    const wordsData = getWordsData(category);
    wordsData.forEach((wordData) => {
      const card = new CardWord(this.cardsField.container.element, wordData);
      this.cards.push(card);
    });
  }

  repeatAudio = (): void => {
    this.currentCard?.playAudio();
  };

  startGame = (): void => {
    this.shuffleCards = shuffleArray<CardWord>(this.cards);
    this.currentCard = this.shuffleCards.pop();
    this.currentCard?.playAudio();
    this.button.element.classList.add('category__btn--repeat');
    this.button.element.addEventListener('click', this.repeatAudio);
  };

  private controlButtonState = (): void => {
    const { isPlayMode } = store.getState().mode;

    if (isPlayMode) {
      this.button.element.classList.remove('category__btn--repeat');
      this.button.element.addEventListener('click', this.startGame, { once: true });
    } else {
      this.button.element.removeEventListener('click', this.repeatAudio);
    }
  };
}
