import './header.scss';
import { BaseComponent } from '../base-component';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = `
      <div class='header__wrapper'></div>
    `;
  }
}
