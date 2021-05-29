import './game.scss';
import { Component } from '../../components/component';
import { Card } from '../../components/card/card';
import { CardsField, RootElement } from '../../components/cards-field/cards-field';
import { Timer } from '../../components/timer/timer';
import { ImageCategoryModel } from '../../models/image-category-model';
import { iDB } from '../../components/indexed-db/indexed-db';
import { GameSettings } from '../../models/game-settings-model';

export class Game extends Component {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private timer: Timer;

  private matches: number;

  private uniqueCards: number;

  mismatches: number;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['game']);
    this.matches = 0;
    this.uniqueCards = 0;
    this.mismatches = 0;
    this.timer = new Timer(this.element);
    this.cardsField = new CardsField(this.element);
    this.start();
  }

  async newGame(images: string[]): Promise<void> {
    this.cardsField.clear();
    const cards = [...images, ...images].map((url) => new Card(url)).sort(() => Math.random() - 0.5);
    this.uniqueCards = images.length;
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    await this.cardsField.addCards(cards);
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
      this.mismatches += 1;
    } else {
      this.matches += 1;
      this.activeCard.showSuccess();
      card.showSuccess();

      if (this.matches === this.uniqueCards) {
        this.stopGame();
      }
    }

    this.activeCard = undefined;
  }

  calculateScore(): number {
    const score = ((this.uniqueCards - this.mismatches) * 100 - this.timer.getSeconds() * 10) * this.uniqueCards;
    return score > 0 ? score : 0;
  }

  async stopGame(): Promise<void> {
    this.timer.stop();
    const users: GameSettings[] = await iDB.readAll('users');
    const user = users[users.length - 1];
    user.score = this.calculateScore();
    iDB.write('users', user);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const { cardsType, difficulty } = (await iDB.readAll<GameSettings>('settings'))[0];
    const index = categories.findIndex((item) => item.category === cardsType);
    const category = categories[index];
    const images = category.images
      .map((name) => `${category.category}/${name}`)
      .sort(() => Math.random() - 0.5)
      .slice(0, difficulty);
    this.newGame(images);
  }
}
