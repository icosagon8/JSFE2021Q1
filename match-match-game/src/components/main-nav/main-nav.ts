import './main-nav.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';
import { NavItemModel } from '../../models/nav-item-model';

export class MainNav extends Component {
  navList?: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'nav', ['main-nav']);
  }

  renderNav(navItem: NavItemModel[]): void {
    this.navList = new Component(this.element, 'ul', ['main-nav__list']);

    for (let i = 0; i < navItem.length; i++) {
      const item = new Component(this.navList.element, 'li');
      const link = new Component(
        item.element,
        'a',
        ['main-nav__link', `main-nav__link--${navItem[i].mod}`],
        navItem[i].text,
        [['href', navItem[i].href]]
      );
    }
  }
}
