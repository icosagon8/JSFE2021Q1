import './cards-field.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class CardsField extends Component {
  container: Component;

  constructor(parentNode: RootElement, className: string) {
    super(parentNode, 'section', [`${className}`, 'cards']);
    this.container = new Component(this.element, 'div', ['cards__field']);
  }
}
