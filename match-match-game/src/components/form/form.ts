import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';
import player from '../../assets/images/player.png';
import { Input } from '../input/input';
import { InputModel } from '../../models/input-model';

export class Form extends Component {
  wrapper: Component;

  groupWrapper: Component;

  imageUpload: Component;

  image: Component;

  buttonsContainer: Component;

  inputs: Input[];

  submitButton: Component;

  cancelButton: Component;

  fileLoader: Component;

  imageLabel: Component;

  imageBase64?: string | ArrayBuffer | null;

  headerAvatar: HTMLImageElement | null;

  constructor(parentNode: RootElement) {
    super(parentNode, 'form', ['popup__form'], '');
    this.wrapper = new Component(this.element, 'div', ['popup__wrapper']);
    this.groupWrapper = new Component(this.wrapper.element, 'div', ['popup__group-wrapper']);
    this.inputs = [];
    this.imageUpload = new Component(this.wrapper.element, 'div', ['popup__image-upload']);
    this.imageLabel = new Component(this.imageUpload.element, 'label', ['popup__image-label'], '', [
      ['for', 'file-input'],
    ]);
    this.image = new Component(this.imageLabel.element, 'img', ['popup__image'], '', [
      ['src', `${player}`],
      ['alt', 'Player'],
    ]);
    this.fileLoader = new Component(this.imageUpload.element, 'input', ['popup__file-loader'], '', [
      ['type', 'file'],
      ['id', 'file-input'],
      ['name', 'avatar'],
      ['accept', 'image/*'],
    ]);
    this.buttonsContainer = new Component(this.element, 'div', ['popup__btn-container']);
    this.submitButton = new Component(this.buttonsContainer.element, 'button', ['popup__btn', 'btn'], 'Add user', [
      ['type', 'submit'],
    ]);
    this.cancelButton = new Component(this.buttonsContainer.element, 'button', ['btn', 'btn--cancel'], 'Cancel');

    this.fileLoader.element.addEventListener('change', () => this.onImageLoaderChange());
    this.headerAvatar = document.querySelector('.header__img');
  }

  addInputs(inputs: InputModel[]): void {
    inputs.forEach((input) => {
      this.inputs.push(new Input(this.groupWrapper.element, input));
    });
  }

  resetInputs(): void {
    this.inputs.forEach((input) => {
      input.field.element.textContent = (input.field.element as HTMLInputElement).defaultValue;
      (input.field.element as HTMLInputElement).value = (input.field.element as HTMLInputElement).defaultValue;
      input.onInput();
    });
  }

  checkInputsValidity(): boolean {
    return this.inputs
      .map((input) => {
        return input.isValid;
      })
      .every((elem) => elem);
  }

  getInputsValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this.inputs.forEach((input) => {
      inputValues[input.name] = (input.field.element as HTMLInputElement).value;
    });

    inputValues[(this.fileLoader.element as HTMLInputElement).name] = this.imageBase64 as string;

    return inputValues;
  }

  onImageLoaderChange(): void {
    const file = (this.fileLoader.element as HTMLInputElement).files;

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file[0]);

      reader.addEventListener('load', () => {
        this.imageBase64 = reader.result;
        (this.image.element as HTMLImageElement).src = reader.result as string;
        if (this.headerAvatar) this.headerAvatar.src = reader.result as string;
      });
    }
  }
}
