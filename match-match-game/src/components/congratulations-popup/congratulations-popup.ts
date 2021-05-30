import './congratulations-popup.scss';
import { RootElement } from '../cards-field/cards-field';
import { Popup } from '../popup/popup';
import { Component } from '../component';

export class CongratulationsPopup extends Popup {
  text: Component;

  button: Component;

  buttonWrapper: Component;

  constructor(parentNode: RootElement, time: string) {
    super(parentNode, 'congratulations');
    this.text = new Component(
      this.popup.element,
      'p',
      ['congratulations-popup__text'],
      `Congratulations! You successfully found all matches on ${time} minutes.`
    );
    this.buttonWrapper = new Component(this.popup.element, 'div', ['congratulations-popup__btn-wrapper']);
    this.button = new Component(this.buttonWrapper.element, 'a', ['btn', 'congratulations-popup__btn'], 'Ok', [
      ['href', '#/score'],
    ]);
    this.button.element.addEventListener('click', () => this.removePopup());
  }

  private removePopup(): void {
    this.element.remove();
  }
}
