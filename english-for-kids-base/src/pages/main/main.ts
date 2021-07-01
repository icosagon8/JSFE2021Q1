import './main.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { CardCategory } from '../../components/card-category/card-category';
import { cards } from '../../data/cards';

export class MainPage extends Component {
  cardsField: Component;

  container: Component;

  constructor(
    parentNode: RootElement,
    private readonly headerNavCallback: (menuItemData: HTMLElement | string) => void
  ) {
    super(parentNode, 'main', ['container', 'main', 'main-home']);
    this.cardsField = new Component(parentNode, 'section', ['categories', 'cards']);
    this.container = new Component(this.element, 'div', ['cards__field']);
    this.addCategoryCards();
  }

  addCategoryCards(): void {
    cards.forEach((categoryData) => new CardCategory(this.container.element, categoryData, this.headerNavCallback));
  }
}
