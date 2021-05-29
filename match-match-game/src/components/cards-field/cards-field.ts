import './cards-field.scss';
import { Component } from '../component';
import { Card } from '../card/card';

const SHOW_TIME = 12;

export type RootElement = HTMLElement | null;

export class CardsField extends Component {
  private cards: Card[];

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['cards-field']);
    this.cards = [];
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): Promise<void> {
    return new Promise((resolve) => {
      this.cards = cards;
      this.cards.forEach((card) => this.element.appendChild(card.element));
      setTimeout(() => {
        this.cards.forEach((card) => card.flipToBack());
        resolve();
      }, SHOW_TIME * 1000);
    });
  }
}
