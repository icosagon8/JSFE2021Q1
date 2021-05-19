import './game.scss';
import { BaseComponent } from '../../components/base-component';
import { Card } from '../../components/card/card';
import { CardsField } from '../../components/cards-field/cards-field';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  constructor() {
    super('main', ['game']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = [...images, ...images].map((url) => new Card(url)).sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (!card.isFlipped) {
      return;
    }

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    this.activeCard = undefined;
  }
}
