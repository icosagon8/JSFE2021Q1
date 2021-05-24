import './game.scss';
import { Component } from '../../components/component';
import { Card } from '../../components/card/card';
import { CardsField, RootElement } from '../../components/cards-field/cards-field';
import { Timer } from '../../components/timer/timer';
import { ImageCategoryModel } from '../../models/image-category-model';

export class Game extends Component {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private timer: Timer;

  private matches: number;

  private uniqueCards: number;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['game']);
    this.matches = 0;
    this.uniqueCards = 0;
    this.timer = new Timer(this.element);
    this.cardsField = new CardsField(this.element);
    this.start();
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = [...images, ...images].map((url) => new Card(url)).sort(() => Math.random() - 0.5);

    this.uniqueCards = images.length;
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
    this.timer.start();
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
      this.activeCard.showError();
      card.showError();
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.activeCard.deleteError();
      card.deleteError();
    } else {
      this.matches += 1;
      this.activeCard.showSuccess();
      card.showSuccess();

      if (this.matches === this.uniqueCards) {
        this.timer.stop();
      }
    }

    this.activeCard = undefined;
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const category = categories[0];
    const images = category.images.map((name) => `${category.category}/${name}`);
    this.newGame(images);
  }
}
