import { Component } from '../../components/component';
import { RootElement } from '../../models/root-element-model';
import { CardCategory } from '../../components/card-category/card-category';
import { getCategoriesData } from '../../services/api';

export class MainPage extends Component {
  container: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['container', 'main']);
    this.container = new Component(this.element, 'div', ['cards__field']);
    this.addCategoryCards();
  }

  async addCategoryCards(): Promise<void> {
    const categoriesData = await getCategoriesData();
    categoriesData.forEach((categoryData) => new CardCategory(this.container.element, categoryData));
  }
}
