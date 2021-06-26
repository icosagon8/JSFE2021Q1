import './card-category.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { CategoryDataModel } from '../../models/category-data-model';

export class CardCategory extends Component {
  image: Component;

  title: Component;

  constructor(
    parentNode: RootElement,
    private readonly category: CategoryDataModel,
    private readonly headerNavCallback: (menuItemData: HTMLElement | string) => void
  ) {
    super(parentNode, 'a', ['category-card'], '', [['href', '#/category']]);
    this.image = new Component(this.element, 'img', ['category-card__img'], '', [
      ['src', `./${category.image}`],
      ['alt', category.name],
    ]);
    this.title = new Component(this.element, 'h3', ['category-card__title'], category.name);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.element.addEventListener('click', this.cardClickHandler);
  }

  cardClickHandler = (): void => {
    this.headerNavCallback(this.category.name);
  };
}
