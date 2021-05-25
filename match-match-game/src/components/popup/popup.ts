import './popup.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';

export class Popup extends Component {
  popup: Component;

  constructor(parentNode: RootElement, name: string) {
    super(parentNode, 'div', ['popup-overlay']);
    this.popup = new Component(this.element, 'div', [`${name}-popup`, 'popup']);
  }

  showPopup(): void {
    this.popup.element.parentElement?.classList.add('popup-overlay--active');
  }

  closePopup(): void {
    this.popup.element.parentElement?.classList.remove('popup-overlay--active');
  }
}
