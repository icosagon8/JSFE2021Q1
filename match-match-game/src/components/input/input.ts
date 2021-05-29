import { Component } from '../component';
import { InputModel, Validate } from '../../models/input-model';
import { RootElement } from '../cards-field/cards-field';

export class Input extends Component {
  label: Component;

  field: Component;

  error: Component;

  validate: Validate;

  name: string;

  isValid: boolean;

  constructor(parentNode: RootElement, input: InputModel) {
    super(parentNode, 'div', ['popup__group']);
    this.name = input.name;
    this.label = new Component(this.element, 'label', ['popup__label'], input.label);
    this.field = new Component(this.element, 'input', ['popup__input'], '', [
      ['type', `${input.type}`],
      ['name', `${input.name}`],
      ['placeholder', `${input.placeholder}`],
    ]);

    this.error = new Component(this.element, 'div', ['popup__error-tooltip']);
    this.field.element.addEventListener('input', () => this.onInput());
    this.validate = input.validate;
    this.isValid = false;
  }

  onInput(): void {
    const { value } = this.field.element as HTMLInputElement;
    const patternMatch = this.validate?.pattern.test(value);
    const rangeInside = value.length <= this.validate.maxLength;

    if (patternMatch && rangeInside) {
      this.element.classList.add('popup__group--valid');
      this.element.classList.remove('popup__group--invalid');
      this.error.element.textContent = '';
      this.isValid = true;
    } else {
      this.element.classList.remove('popup__group--valid');
      this.element.classList.add('popup__group--invalid');

      if (!value.length) {
        this.setError(`The field must not be empty`);
      } else if (!patternMatch && !rangeInside) {
        this.setError(`
        The field cannot consist only of numbers and contain service characters.
        Delete ${value.length - this.validate.maxLength} characters.
        (The length must be no more than ${this.validate.maxLength} characters)`);
      } else if (!patternMatch) {
        this.setError(`The field cannot consist only of numbers
        and contain service characters`);
      } else if (!rangeInside) {
        this.setError(`Delete ${value.length - this.validate.maxLength}
        characters. (The length must be no more than ${this.validate.maxLength} characters)`);
      }

      this.isValid = false;
    }
  }

  getValue(): string {
    return (this.field.element as HTMLInputElement).value;
  }

  setError(errorText: string): void {
    this.error.element.textContent = errorText;
  }
}
