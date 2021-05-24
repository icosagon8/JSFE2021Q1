import './card.scss';
import { Component } from '../component';

const FLIP_CLASS = 'card-container--flipped';

export class Card extends Component {
  isFlipped: boolean;

  card: Component;

  cardFront: Component;

  cardBack: Component;

  constructor(readonly image: string) {
    super(null, 'div', ['card-container']);
    this.isFlipped = false;
    this.card = new Component(this.element, 'div', ['card']);
    this.cardFront = new Component(this.card.element, 'div', ['card__front'], '', [
      ['style', `background-image: url(./images/${image})`],
    ]);
    this.cardBack = new Component(this.card.element, 'div', ['card__back']);
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  showError(): void {
    this.element.classList.add('card-container--error');
  }

  deleteError(): void {
    this.element.classList.remove('card-container--error');
  }

  showSuccess(): void {
    this.element.classList.add('card-container--success');
  }

  private flip(isFront = false): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), { once: true });
    });

    return promise;
  }
}
