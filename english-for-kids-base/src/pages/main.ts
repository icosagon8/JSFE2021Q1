import { Component } from '../components/component';
import { RootElement } from '../models/root-element-model';
import { CardsField } from '../components/cards-field/cards-field';
import { getCategoryData } from '../services/cards-services';
import { CardCategory } from '../components/card-category/card-category';

export class MainPage extends Component {
  cardsField: CardsField;

  constructor(
    parentNode: RootElement,
    private readonly headerNavCallback: (menuItemData: HTMLElement | string) => void
  ) {
    super(parentNode, 'main', ['container', 'main']);
    this.cardsField = new CardsField(this.element, 'categories');
    this.addCategoryCards();
  }

  addCategoryCards(): void {
    const categoryData = getCategoryData();
    categoryData.forEach(
      (category) => new CardCategory(this.cardsField.container.element, category, this.headerNavCallback)
    );
  }
}
