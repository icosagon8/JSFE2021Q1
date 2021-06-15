import './popup.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class Popup extends Component {
  popup: Component;

  constructor(parentNode: RootElement, content: string) {
    super(parentNode, 'div', ['popup-overlay']);
    this.popup = new Component(this.element, 'div', ['popup'], content);
  }

  showPopup(): void {
    this.element.classList.add('popup-overlay--active');
  }

  closePopup(): void {
    this.element.classList.remove('popup-overlay--active');
  }
}
