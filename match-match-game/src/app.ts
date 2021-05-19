import { Game } from './pages/game/game';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const category = categories[0];
    const images = category.images.map((name) => `${category.category}/${name}`);
    this.game.newGame(images);
  }
}
