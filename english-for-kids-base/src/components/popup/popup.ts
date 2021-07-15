import './popup.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';

export class Popup extends Component {
  popup: Component;

  header: Component;

  title: Component;

  groupWrapper: Component;

  loginWrapper: Component;

  loginLabel: Component;

  loginField: Component;

  passwordWrapper: Component;

  passwordLabel: Component;

  passwordField: Component;

  footer: Component;

  cancelBtn: Component;

  loginBtn: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['popup-overlay']);
    this.popup = new Component(this.element, 'div', ['popup']);
    this.header = new Component(this.popup.element, 'div', ['popup__header']);
    this.title = new Component(this.header.element, 'p', ['popup__title'], 'Login');
    this.groupWrapper = new Component(this.header.element, 'div', ['popup__group-wrapper']);
    this.loginWrapper = new Component(this.groupWrapper.element, 'div', ['popup__field-group']);
    this.loginLabel = new Component(this.loginWrapper.element, 'label', ['popup__label'], 'login');
    this.loginField = new Component(this.loginWrapper.element, 'input', ['popup__field']);
    this.passwordWrapper = new Component(this.groupWrapper.element, 'div', ['popup__field-group']);
    this.passwordLabel = new Component(this.passwordWrapper.element, 'label', ['popup__label'], 'password');
    this.passwordField = new Component(this.passwordWrapper.element, 'input', ['popup__field']);
    this.footer = new Component(this.popup.element, 'div', ['popup__footer']);
    this.cancelBtn = new Component(this.footer.element, 'button', ['popup__btn', 'popup__cancel-btn'], 'Cancel');
    this.loginBtn = new Component(this.footer.element, 'button', ['popup__btn', 'popup__login-btn'], 'Login');
    this.cancelBtn.element.addEventListener('click', () => this.closePopup());
    this.loginBtn.element.addEventListener('click', this.loginBtnClickHandler);
  }

  showPopup(): void {
    this.element.classList.add('popup-overlay--active');
  }

  closePopup(): void {
    this.element.classList.remove('popup-overlay--active');
  }

  loginBtnClickHandler = (): void => {
    if (
      (<HTMLInputElement>this.loginField.element).value === 'admin' &&
      (<HTMLInputElement>this.passwordField.element).value === 'admin'
    ) {
      window.location.hash = '/admin';
    }
  };
}
