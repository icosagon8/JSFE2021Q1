import './card-word.scss';
import { Unsubscribe } from 'redux';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { WordDataModel } from '../../models/word-data-model';
import { store } from '../../store/store';

export class CardWord extends Component {
  card: Component;

  cardFront: Component;

  cardFrontHeader: Component;

  cardFrontFooter: Component;

  cardBack: Component;

  cardBackHeader: Component;

  cardBackFooter: Component;

  flipper: Component;

  audio: HTMLAudioElement;

  unsubscribe: Unsubscribe;

  constructor(parentNode: RootElement, wordData: WordDataModel) {
    super(parentNode, 'div', ['card-container']);
    this.card = new Component(this.element, 'div', ['card']);
    this.cardFront = new Component(this.card.element, 'div', ['card__front']);
    this.cardFrontHeader = new Component(this.cardFront.element, 'div', ['card__header'], '', [
      ['style', `background-image: url(./${wordData.image})`],
    ]);
    this.cardFrontFooter = new Component(
      this.cardFront.element,
      'p',
      ['card__footer', 'card__footer--front'],
      wordData.word
    );
    this.flipper = new Component(this.cardFrontFooter.element, 'div', ['card__flipper']);
    this.cardBack = new Component(this.card.element, 'div', ['card__back']);
    this.cardBackHeader = new Component(this.cardBack.element, 'div', ['card__header'], '', [
      ['style', `background-image: url(./${wordData.image})`],
    ]);
    this.cardBackFooter = new Component(this.cardBack.element, 'p', ['card__footer'], wordData.translation);
    this.audio = new Audio(`./${wordData.audioSrc}`);
    this.toggleCardMode();
    this.unsubscribe = store.subscribe(this.toggleCardMode);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.flipper.element.addEventListener('click', this.flipperClickHandler);
    window.addEventListener('hashchange', () => this.unsubscribe(), { once: true });
  }

  private toggleCardMode = (): void => {
    const { isPlayMode } = store.getState().mode;

    if (isPlayMode) {
      this.cardFront.element.removeEventListener('click', this.cardClickHandler);
    } else {
      this.cardFront.element.addEventListener('click', this.cardClickHandler);
    }
  };

  private flipperClickHandler = (evt: Event): void => {
    evt.stopPropagation();
    this.flipToFront();
  };

  private cardClickHandler = (): void => {
    this.playAudio();
  };

  private flipToFront = (): void => {
    this.flip();
    this.card.element.addEventListener('mouseleave', this.flipToBack, { once: true });
  };

  private flipToBack = (): void => {
    this.flip();
  };

  private flip(): void {
    this.card.element.classList.toggle('card--flipped');
  }

  playAudio = (): void => {
    this.audio.play();
  };
}
