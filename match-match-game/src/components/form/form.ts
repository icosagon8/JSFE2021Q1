import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';
import player from '../../assets/images/player.png';
import { Input } from '../input/input';
import { InputModel } from '../../models/input-model';

export class Form extends Component {
  wrapper: Component;

  groupWrapper: Component;

  imageWrapper: Component;

  image: Component;

  buttonsContainer: Component;

  inputs: Input[];

  addButton: Component;

  cancelButton: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'form', ['popup__form'], '');
    this.wrapper = new Component(this.element, 'div', ['popup__wrapper']);
    this.groupWrapper = new Component(this.wrapper.element, 'div', ['popup__group-wrapper']);
    this.inputs = [];
    this.imageWrapper = new Component(this.wrapper.element, 'div', ['popup__image']);
    this.image = new Component(this.imageWrapper.element, 'img', [], '', [
      ['src', `${player}`],
      ['alt', 'Player'],
    ]);
    this.buttonsContainer = new Component(this.element, 'div', ['popup__btn-container']);
    this.addButton = new Component(this.buttonsContainer.element, 'button', ['popup__btn', 'btn'], 'Add user');
    this.cancelButton = new Component(this.buttonsContainer.element, 'button', ['btn', 'btn--cancel'], 'Cancel');
  }

  addInputs(inputs: InputModel[]): void {
    inputs.forEach((input) => {
      this.inputs.push(new Input(this.groupWrapper.element, input));
    });
  }
}
