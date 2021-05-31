import './header.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';
import { MainNav } from '../main-nav/main-nav';
import image from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.jpg';
import { NavItemModel } from '../../models/nav-item-model';
import { RegisterPopup } from '../register-popup/register-popup';
import { iDB } from '../indexed-db/indexed-db';

const PAGES: NavItemModel[] = [
  { href: '#/about', mod: 'about', text: 'About Game' },
  { href: '#/score', mod: 'score', text: 'Best Score' },
  { href: '#/settings', mod: 'settings', text: 'Game Settings' },
];

export class Header extends Component {
  private readonly container: Component;

  logo: Component;

  private readonly nav: MainNav;

  button: Component;

  private readonly avatar: Component;

  avatarImage: Component;

  popup: RegisterPopup;

  constructor(parentNode: RootElement) {
    super(parentNode, 'header', ['header']);
    this.container = new Component(this.element, 'div', ['header__wrapper', 'container']);
    this.logo = new Component(this.container.element, 'img', ['header__logo'], '', [['src', image]]);
    this.nav = new MainNav(this.container.element);
    this.nav.element.classList.add('header__nav');
    this.nav.renderNav(PAGES);
    this.button = new Component(
      this.container.element,
      'a',
      ['header__btn', 'btn', 'btn--main'],
      'Register new player'
    );
    this.avatar = new Component(this.container.element, 'div', ['header__avatar']);
    this.avatarImage = new Component(this.avatar.element, 'img', ['header__img'], '', [['src', avatar]]);
    this.popup = new RegisterPopup(parentNode);

    this.button.element.addEventListener('click', this.onButtonClick);
  }

  onButtonClick = (): void => {
    if (this.button.element.textContent === 'Register new player') {
      this.popup.showPopup();
      document.addEventListener('click', this.onPopupOverlayClick);
      this.popup.form.cancelButton.element.addEventListener('click', this.onCancelButtonClick);
      this.popup.form.submitButton.element.addEventListener('click', this.onSubmitButtonClick);
      this.button.element.removeEventListener('click', this.onButtonClick);
    }
  };

  onCancelButtonClick = (evt: Event): void => {
    evt.preventDefault();
    this.popup.form.resetInputs();
  };

  onSubmitButtonClick = (evt: Event): void => {
    evt.preventDefault();

    this.popup.form.inputs.forEach((input) => {
      input.onInput();
    });

    if (this.popup.form.checkInputsValidity()) {
      iDB.write('users', this.popup.form.getInputsValues());
      document.removeEventListener('click', this.onPopupOverlayClick);
      this.button.element.addEventListener('click', this.onButtonClick);
      this.popup.closePopup();
      this.popup.form.resetInputs();
      localStorage.setItem('registered', 'yes');
      this.button.element.textContent = 'Start game';
      (this.button.element as HTMLAnchorElement).href = '#/game';
    }
  };

  onPopupOverlayClick = (evt: Event): void => {
    if ((evt.target as HTMLElement).classList.contains('popup-overlay')) {
      this.popup.closePopup();
      this.popup.form.resetInputs();
      document.removeEventListener('click', this.onPopupOverlayClick);
      this.popup.form.cancelButton.element.removeEventListener('click', this.onCancelButtonClick);
      this.popup.form.submitButton.element.removeEventListener('click', this.onSubmitButtonClick);
      this.button.element.addEventListener('click', this.onButtonClick);
    }
  };
}
