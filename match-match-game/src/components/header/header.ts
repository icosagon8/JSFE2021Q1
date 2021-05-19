import './header.scss';
import { BaseComponent } from '../base-component';
import { Container } from '../container/container';
import { Logo } from '../logo/logo';
import { MainNav } from '../main-nav/main-nav';
import { Button } from '../button/button';
import { Avatar } from '../avatar/avatar';

export class Header extends BaseComponent {
  private readonly container: Container;

  private readonly logo: Logo;

  private readonly nav: MainNav;

  private readonly button: Button;

  private readonly avatar: Avatar;

  constructor() {
    super('header', ['header']);
    this.container = new Container();
    this.container.element.classList.add('header__wrapper');
    this.element.appendChild(this.container.element);
    this.logo = new Logo();
    this.logo.element.classList.add('header__logo');
    this.container.element.appendChild(this.logo.element);
    this.nav = new MainNav();
    this.nav.element.classList.add('header__nav');
    this.container.element.appendChild(this.nav.element);
    this.button = new Button();
    this.button.element.classList.add('header__btn');
    this.container.element.appendChild(this.button.element);
    this.avatar = new Avatar();
    this.container.element.appendChild(this.avatar.element);
  }
}
