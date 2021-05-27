import './register-popup.scss';
import { Popup } from '../popup/popup';
import { RootElement } from '../cards-field/cards-field';
import { Component } from '../component';
import { Form } from '../form/form';
import { InputModel } from '../../models/input-model';

const INPUTS: InputModel[] = [
  {
    name: 'name',
    type: 'text',
    label: 'First Name',
    placeholder: 'Jessie',
    validate: {
      pattern: /(?!^[\d ]+$)^[^!@#$%*()_—+=|:;"'`<>,.?/^]+$/,
      maxLength: 30,
    },
  },
  {
    name: 'surname',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
    validate: {
      pattern: /(?!^[\d ]+$)^[^!@#$%*()_—+=|:;"'`<>,.?/^]+$/,
      maxLength: 30,
    },
  },
  {
    name: 'email',
    type: 'text',
    label: 'E-mail',
    placeholder: 'Jessie.Doe@gmail.com',
    validate: {
      pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      maxLength: 30,
    },
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
