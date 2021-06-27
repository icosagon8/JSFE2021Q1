import './main-nav.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { routes } from '../../router/routes';

export class MainNav extends Component {
  toggle: Component;

  lines: Component;

  menu: Component;

  activeMenuItem?: HTMLElement;

  menuItems: HTMLElement[];

  constructor(parentNode: RootElement) {
    super(parentNode, 'nav', ['main-nav']);
    this.toggle = new Component(this.element, 'button', ['main-nav__toggle'], '', [['type', 'button']]);
    this.lines = new Component(this.toggle.element, 'span', ['main-nav__lines']);
    this.menu = new Component(this.element, 'ul', ['main-nav__list']);
    this.menuItems = [];
    this.addMenuItems();
    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.toggle.element.addEventListener('click', this.toggleClickHandler);
  }

  private toggleClickHandler = (evt: Event): void => {
    evt.stopPropagation();
    this.transformLines();
    this.toggleMenu();
  };

  private menuOutsideClickHandler = (evt: Event): void => {
    const menu = (<Element>evt.target).closest('.main-nav__list');

    if (!menu) {
      this.transformLines();
      this.toggleMenu();
    }
  };

  private transformLines(): void {
    this.toggle.element.classList.toggle('main-nav__toggle--open');
  }

  private toggleMenu(): void {
    this.menu.element.classList.toggle('main-nav__list--open');

    if (this.menu.element.classList.contains('main-nav__list--open')) {
      document.addEventListener('click', this.menuOutsideClickHandler);
    } else {
      document.removeEventListener('click', this.menuOutsideClickHandler);
    }
  }

  private createMenuItem(name: string, path: string) {
    const li = new Component(this.menu.element, 'li', ['main-nav__item']);
    const a = new Component(li.element, 'a', ['main-nav__link'], `${name}`, [['href', `#/${path}`]]);
    this.menuItems.push(li.element);
    a.element.addEventListener('click', this.menuItemClickHandler);
    this.highlightInitMenuItem(li.element, path);

    return a;
  }

  private menuItemClickHandler = (evt: Event): void => {
    this.highlightActiveMenuItem(<HTMLElement>evt.target);
    this.transformLines();
    this.toggleMenu();
  };

  private highlightInitMenuItem(menuItem: HTMLElement, path: string): void {
    if (path === '') {
      menuItem.classList.add('main-nav__item--active');
      this.activeMenuItem = menuItem;
    }
  }

  highlightActiveMenuItem = (menuItemData: HTMLElement | string): void => {
    this.activeMenuItem?.classList.remove('main-nav__item--active');

    if (typeof menuItemData === 'string') {
      this.activeMenuItem = <HTMLElement>this.menuItems.find((menuItem) => menuItem.textContent === menuItemData);
    } else {
      this.activeMenuItem = <HTMLElement>menuItemData.closest('.main-nav__item');
    }

    this.activeMenuItem.classList.add('main-nav__item--active');
  };

  private addMenuItems(): void {
    routes.forEach((route) => {
      this.createMenuItem(route.name, route.path);
    });
  }
}
