import './card-category.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { CategoryDataModel } from '../../models/category-data-model';
import { getKebabCaseString } from '../../helpers/utils';
import { store } from '../../store/store';

export class CardCategory extends Component {
  image: Component;

  title: Component;

  constructor(
    parentNode: RootElement,
    private readonly categoryData: CategoryDataModel,
    private readonly headerNavCallback: (menuItemData: HTMLElement | string) => void
  ) {
    super(parentNode, 'a', ['category-card'], '', [['href', `#/${getKebabCaseString(categoryData.category)}`]]);
    this.image = new Component(this.element, 'img', ['category-card__img'], '', [
      ['src', `./${categoryData.image}`],
      ['alt', categoryData.category],
    ]);
    this.title = new Component(this.element, 'h3', ['category-card__title'], categoryData.category);
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.element.addEventListener('click', this.cardClickHandler);
  }

  cardClickHandler = (): void => {
    this.headerNavCallback(this.categoryData.category);
    store.dispatch({
      type: 'UPDATE_PAGE',
      text: this.categoryData.category,
    });
  };
}
