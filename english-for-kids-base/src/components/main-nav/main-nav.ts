import './main-nav.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { store } from '../../store/store';
import { getKebabCaseString } from '../../helpers/utils';
import { RouteModel } from '../../models/route-model';
import { Popup } from '../popup/popup';

export interface HTMLElementMenuItem extends HTMLElement {
  categoryId: string;
}
export class MainNav extends Component {
  toggle: Component;

  lines: Component;

  menu: Component;

  activeMenuItem?: HTMLElement;

  menuItems: HTMLElement[];

  loginBtn: Component;

  menuContainer: Component;

  popup: Popup;

  constructor(parentNode: RootElement, private readonly routes: RouteModel[]) {
    super(parentNode, 'nav', ['main-nav']);
    this.toggle = new Component(this.element, 'button', ['main-nav__toggle'], '', [['type', 'button']]);
    this.lines = new Component(this.toggle.element, 'span', ['main-nav__lines']);
    this.menuContainer = new Component(this.element, 'div', ['main-nav__menu']);
    this.menu = new Component(this.menuContainer.element, 'ul', ['main-nav__list']);
    this.menuItems = [];
    this.addMenuItems();
    this.loginBtn = new Component(this.menuContainer.element, 'button', ['main-nav__login-btn'], 'Login');
    this.popup = new Popup(this.element);
    this.setEventHandlers();
    this.highlightMenuItem();
  }

  private setEventHandlers(): void {
    this.toggle.element.addEventListener('click', this.toggleClickHandler);
    this.loginBtn.element.addEventListener('click', this.loginBtnClickHandler);
  }

  private toggleClickHandler = (evt: Event): void => {
    evt.stopPropagation();
    this.transformLines();
    this.toggleMenu();
  };

  private menuOutsideClickHandler = (evt: Event): void => {
    if ((<Element>evt.target).closest('.popup-overlay')) return;

    const menu = (<Element>evt.target).closest('.main-nav__menu');

    if (!menu) {
      this.transformLines();
      this.toggleMenu();
    }
  };

  private loginBtnClickHandler = (): void => {
    this.popup.showPopup();
  };

  private transformLines(): void {
    this.toggle.element.classList.toggle('main-nav__toggle--open');
  }

  private toggleMenu(): void {
    this.menuContainer.element.classList.toggle('main-nav__menu--open');

    if (this.menuContainer.element.classList.contains('main-nav__menu--open')) {
      document.addEventListener('click', this.menuOutsideClickHandler);
    } else {
      document.removeEventListener('click', this.menuOutsideClickHandler);
    }
  }

  private createMenuItem(name: string, path: string, categoryId?: string) {
    const li = new Component(this.menu.element, 'li', ['main-nav__item']);
    const a = new Component(li.element, 'a', ['main-nav__link'], `${name}`, [['href', `#/${path}`]]);
    if (categoryId) (<HTMLElementMenuItem>a.element).categoryId = categoryId;
    this.menuItems.push(li.element);
    a.element.addEventListener('click', this.menuItemClickHandler);

    return a;
  }

  private menuItemClickHandler = (evt: Event): void => {
    this.transformLines();
    this.toggleMenu();
    store.dispatch({
      type: 'UPDATE_PAGE',
      text: (<HTMLElementMenuItem>evt.target).categoryId,
    });
  };

  highlightMenuItem(): void {
    const path = window.location.hash.slice(2);

    if (path === '') {
      this.activeMenuItem = this.menuItems.find((menuItem) => menuItem.textContent === 'Main Page');
    } else {
      this.activeMenuItem = <HTMLElement>(
        this.menuItems.find((menuItem) => getKebabCaseString(<string>menuItem.textContent) === path)
      );
    }

    this.activeMenuItem?.classList.add('main-nav__item--active');
  }

  private addMenuItems(): void {
    this.routes.forEach((route) => {
      if (route.menu) this.createMenuItem(route.name, route.path, route.categoryId);
    });
  }
}
