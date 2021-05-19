import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'card-container--flipped';

export class Card extends BaseComponent {
  isFlipped: boolean;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url(./images/${image})"></div>
        <div class="card__back"></div>
      </div>
    `;
    this.isFlipped = false;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), { once: true });
    });

    return promise;
  }
}
