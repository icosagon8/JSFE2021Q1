import './header.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import { MainNav } from '../main-nav/main-nav';
import { Switch } from '../switch/switch';
import { RouteModel } from '../../models/route-model';

export class Header extends Component {
  wrapper: Component;

  nav: MainNav;

  switch: Switch;

  constructor(parentNode: RootElement, routes: RouteModel[]) {
    super(parentNode, 'header', ['container', 'header']);
    this.wrapper = new Component(this.element, 'div', ['header__wrapper']);
    this.nav = new MainNav(this.wrapper.element, routes);
    this.switch = new Switch(this.wrapper.element);
  }
}
