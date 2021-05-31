import { RootElement } from '../components/cards-field/cards-field';
import { Header } from '../components/header/header';
import { RouteModel } from '../models/route-model';
import { About } from '../pages/about/about';
import { ErrorPage } from '../pages/error/error';
import { Game } from '../pages/game/game';
import { Score } from '../pages/score/score';
import { Settings } from '../pages/settings/settings';

export class Router {
  private location?: string;

  private readonly routes: RouteModel[];

  links: Element[];

  header: Header;

  constructor(private readonly rootElement: HTMLElement, header: Header) {
    this.routes = [
      { path: 'about', Page: About },
      { path: 'game', Page: Game },
      { path: 'score', Page: Score },
      { path: 'settings', Page: Settings },
    ];

    this.links = [...document.querySelectorAll('.main-nav__link')];
    this.header = header;
  }

  render(): void {
    this.parseLocation();
    const { Page } = this.findPage(this.routes) || { Page: ErrorPage };
    const page = new Page(this.rootElement);
    const main: RootElement = document.querySelector('main');

    if (main) {
      main.remove();
    }

    this.header.element.after(page.element);
    this.controlButton();
    this.highlightRout();
  }

  private controlButton() {
    const registered = localStorage.getItem('registered');

    if (registered) {
      if (this.location === 'game') {
        this.header.button.element.textContent = 'Stop game';
        (this.header.button.element as HTMLAnchorElement).href = '#/about';
      } else {
        this.header.button.element.textContent = 'Start game';
        (this.header.button.element as HTMLAnchorElement).href = '#/game';
      }
    }
  }

  private highlightRout(): void {
    this.links.forEach((link) => {
      if (link.classList.contains('main-nav__link--active')) {
        link.classList.remove('main-nav__link--active');
      }
    });

    this.links.forEach((link) => {
      if (link.classList.contains(`main-nav__link--${this.location}`)) {
        link.classList.add('main-nav__link--active');
      }
    });
  }

  private parseLocation(): string {
    this.location = window.location.hash.slice(2) || 'about';
    return this.location;
  }

  private findPage(routes: RouteModel[]) {
    return routes.find((route: RouteModel) => route.path === this.location);
  }
}
