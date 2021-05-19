import './button.scss';
import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor() {
    super('a', ['control-btn']);
    this.element.textContent = 'Stop game';
    this.element.setAttribute('href', '#/about/');
  }
}
