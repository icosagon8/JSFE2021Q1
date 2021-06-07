import './car.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class Car extends Component {
  optionsWrapper: Component;

  selectBtn: Component;

  removeBtn: Component;

  carName: Component;

  roadWrapper: Component;

  engineControls: Component;

  startBtn: Component;

  stopBtn: Component;

  road: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'li', ['cars__item']);
    this.optionsWrapper = new Component(this.element, 'div', ['cars__options-wrapper']);
    this.selectBtn = new Component(this.optionsWrapper.element, 'button', ['btn', 'cars__select-btn'], 'Select', [
      ['type', 'button'],
    ]);
    this.removeBtn = new Component(this.optionsWrapper.element, 'button', ['btn', 'cars__remove-btn'], 'Remove', [
      ['type', 'button'],
    ]);
    this.carName = new Component(this.optionsWrapper.element, 'span', ['cars__car-name'], 'Car name');
    this.roadWrapper = new Component(this.element, 'div', ['cars__road-wrapper']);
    this.engineControls = new Component(this.roadWrapper.element, 'div', ['cars__engine-controls']);
    this.startBtn = new Component(this.engineControls.element, 'button', ['btn', 'cars__start-btn'], 'A', [
      ['type', 'button'],
    ]);
    this.stopBtn = new Component(this.engineControls.element, 'button', ['btn', 'cars__stop-btn'], 'B', [
      ['type', 'button'],
    ]);
    this.road = new Component(this.roadWrapper.element, 'div', ['cars__road']);
  }
}
