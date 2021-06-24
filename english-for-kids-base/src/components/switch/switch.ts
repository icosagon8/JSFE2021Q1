import './switch.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class Switch extends Component {
  field: Component;

  label: Component;

  text: Component;

  slider: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['switch']);
    this.field = new Component(this.element, 'input', ['switch__field'], '', [
      ['id', 'switch-label'],
      ['type', 'checkbox'],
    ]);
    this.label = new Component(this.element, 'label', ['switch__label'], '', [['for', 'switch-label']]);
    this.text = new Component(this.label.element, 'span', ['switch__text']);
    this.slider = new Component(this.label.element, 'span', ['switch__slider']);
  }
}
