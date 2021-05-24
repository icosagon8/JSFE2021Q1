import { Component } from '../component';
import { InputModel } from '../../models/input-model';
import { RootElement } from '../cards-field/cards-field';

export class Input extends Component {
  label: Component;

  input: Component;

  constructor(parentNode: RootElement, input: InputModel) {
    super(parentNode, 'div', ['popup__group', 'popup__group--valid']);
    this.label = new Component(this.element, 'label', ['popup__label'], input.label);
    this.input = new Component(this.element, 'input', ['popup__input'], '', [
      ['type', `${input.type}`],
      ['placeholder', `${input.placeholder}`],
    ]);
  }
}
