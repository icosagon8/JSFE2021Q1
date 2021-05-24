import './header.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';
import { MainNav } from '../main-nav/main-nav';
import image from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.jpg';
import { NavItemModel } from '../../models/nav-item-model';

const PAGES: NavItemModel[] = [
  { href: '#', mod: 'about', text: 'About Game' },
  { href: '#/score', mod: 'score', text: 'Best Score' },
  { href: '#/settings', mod: 'about', text: 'Game Settings' },
];

export class Header extends Component {
  private readonly container: Component;

  logo: Component;

  private readonly nav: MainNav;

  button: Component;

  private readonly avatar: Component;

  avatarImage: Component;

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
      'Register new player',
      [['href', '#']]
    );
    this.avatar = new Component(this.container.element, 'div', ['header__avatar']);
    this.avatarImage = new Component(this.avatar.element, 'img', ['header__img'], '', [['src', avatar]]);
  }
}
