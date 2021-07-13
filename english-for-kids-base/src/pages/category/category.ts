import './category.scss';
import { Unsubscribe } from 'redux';
import { CardWord } from '../../components/card-word/card-word';
import { CardsField } from '../../components/cards-field/cards-field';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store/store';
import { shuffleArray } from '../../helpers/utils';
import { PLAY_AUDIO_DELAY, REDIRECT_DELAY } from '../../helpers/constants';
import { StatisticsModel } from '../../models/statistics-model';
import { getCategoryWordsData } from '../../services/api';

export class Category extends Component {
  cardsField: CardsField;

  button: Component;

  cards: CardWord[];

  shuffleCards?: CardWord[];

  currentCard?: CardWord;

  unsubscribe: Unsubscribe;

  errorAudio: HTMLAudioElement;

  correctAudio: HTMLAudioElement;

  winAudio: HTMLAudioElement;

  loseAudio: HTMLAudioElement;

  stars: Component;

  star?: Component;

  errors: number;

  result?: Component;

  category: string;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main', 'main--category']);
    this.cardsField = new CardsField(this.element, 'category');
    this.stars = new Component(null, 'div', ['category__stars']);
    this.cardsField.element.prepend(this.stars.element);
    this.button = new Component(this.cardsField.element, 'button', ['category__btn--start'], 'Start');
    this.category = store.getState().page.category;
    this.cards = [];
    this.errors = 0;
    this.errorAudio = new Audio('./audio/error.mp3');
    this.correctAudio = new Audio('./audio/correct.mp3');
    this.winAudio = new Audio('./audio/success.mp3');
    this.loseAudio = new Audio('./audio/failure.mp3');
    this.addCategoryCards();
    this.unsubscribe = store.subscribe(this.controlButtonState);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.button.element.addEventListener('click', this.startGame, { once: true });
    window.addEventListener('hashchange', () => this.unsubscribe(), { once: true });
  }

  async addCategoryCards(): Promise<void> {
    const wordsData = await getCategoryWordsData(this.category);
    wordsData.forEach((wordData) => {
      const card = new CardWord(this.cardsField.container.element, wordData, this.category);
      this.cards.push(card);
    });
  }

  private repeatAudio = (): void => {
    this.currentCard?.playAudio();
  };

  private startGame = (): void => {
    this.shuffleCards = shuffleArray<CardWord>(this.cards);
    this.currentCard = this.shuffleCards.pop();
    this.category = <string>this.currentCard?.category;
    this.currentCard?.playAudio();
    this.button.element.classList.add('category__btn--repeat');
    this.button.element.addEventListener('click', this.repeatAudio);
    this.cardsField.container.element.addEventListener('click', this.cardFieldClickHandler);
  };

  private finishGame = (): void => {
    this.cardsField.element.remove();

    if (!this.errors) {
      this.result = new Component(this.element, 'div', ['category__result']);
      this.winAudio.play();
    } else {
      this.result = new Component(this.element, 'div', ['category__result', 'category__result--failure']);
      this.loseAudio.play();
    }

    setTimeout(() => {
      window.location.hash = '#/';
    }, REDIRECT_DELAY);
  };

  private cardFieldClickHandler = (evt: Event): void => {
    const card = <HTMLElement>(<HTMLElement>evt.target).closest('.card');
    if (!card) return;
    if (!this.shuffleCards?.length) this.finishGame();
    const statisticsData = <string>localStorage.getItem('statistics');
    const statistics: StatisticsModel[] = JSON.parse(statisticsData);
    const currentCardStatistics = <StatisticsModel>statistics.find((item) => item.id === this.currentCard?.wordId);

    if (card === this.currentCard?.card.element) {
      this.correctAudio.play();
      card.classList.add('card--inactive');
      (() => new Component(this.stars.element, 'div', ['category__star']))();
      currentCardStatistics.hit++;
      this.currentCard = this.shuffleCards?.pop();
      this.category = <string>this.currentCard?.category;
      setTimeout(() => this.currentCard?.playAudio(), PLAY_AUDIO_DELAY);
    } else {
      (() => new Component(this.stars.element, 'div', ['category__star', 'category__star--error']))();
      this.errorAudio.play();
      this.errors++;
      currentCardStatistics.miss++;
    }

    currentCardStatistics.percent = this.getHitsPercent(currentCardStatistics);
    localStorage.setItem('statistics', JSON.stringify(statistics));
  };

  private controlButtonState = (): void => {
    const { isPlayMode } = store.getState().mode;
    this.button.element.removeEventListener('click', this.repeatAudio);
    this.cardsField.container.element.removeEventListener('click', this.cardFieldClickHandler);
    this.stars.element.innerHTML = '';
    this.errors = 0;

    this.cards.forEach((cardWord) => {
      cardWord.card.element.classList.remove('card--inactive');
    });

    if (isPlayMode) {
      this.button.element.classList.remove('category__btn--repeat');
      this.button.element.addEventListener('click', this.startGame, { once: true });
    }
  };

  getHitsPercent = (wordStatistic: StatisticsModel): number => {
    const percent =
      wordStatistic.hit / (wordStatistic.hit + wordStatistic.miss)
        ? Math.round((wordStatistic.hit / (wordStatistic.hit + wordStatistic.miss)) * 100)
        : wordStatistic.percent;

    return percent;
  };
}
