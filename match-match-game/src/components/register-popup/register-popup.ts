import './register-popup.scss';
import { Popup } from '../popup/popup';
import { RootElement } from '../cards-field/cards-field';
import { Component } from '../component';
import { Form } from '../form/form';
import { InputModel } from '../../models/input-model';

const INPUTS: InputModel[] = [
  {
    type: 'text',
    label: 'First Name',
    placeholder: 'Jessie',
  },
  {
    type: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  {
    type: 'email',
    label: 'E-mail',
    placeholder: 'Jessie.Doe@gmail.com',
  },
];

export class RegisterPopup extends Popup {
  title: Component;

  form: Form;

  constructor(parentNode: RootElement) {
    super(parentNode, 'register');
    this.title = new Component(this.popup.element, 'h2', ['popup__title'], 'Register new Player');
    this.form = new Form(this.popup.element);
    this.form.addInputs(INPUTS);
  }
}
