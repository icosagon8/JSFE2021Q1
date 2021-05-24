import './popup.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';

export class Popup extends Component {
  popup: Component;

  constructor(parentNode: RootElement, name: string) {
    super(parentNode, 'div', ['popup-overlay']);
    this.popup = new Component(this.element, 'div', [`${name}-popup`, 'popup']);
  }
}
