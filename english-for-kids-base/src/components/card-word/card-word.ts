import './card-word.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { WordDataModel } from '../../models/word-data-model';

export class CardWord extends Component {
  card: Component;

  cardFront: Component;

  cardFrontHeader: Component;

  cardFrontFooter: Component;

  cardBack: Component;

  cardBackHeader: Component;

  cardBackFooter: Component;

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
    this.cardBack = new Component(this.card.element, 'div', ['card__back']);
    this.cardBackHeader = new Component(this.cardBack.element, 'div', ['card__header'], '', [
      ['style', `background-image: url(./${wordData.image})`],
    ]);
    this.cardBackFooter = new Component(this.cardBack.element, 'p', ['card__footer'], wordData.translation);
  }
}
