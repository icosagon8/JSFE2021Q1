import { RootElement } from '../components/cards-field/cards-field';
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

  constructor(private readonly rootElement: HTMLElement) {
    this.routes = [
      { path: '/about', Page: About },
      { path: '/game', Page: Game },
      { path: '/score', Page: Score },
      { path: '/settings', Page: Settings },
    ];

    this.links = [...document.querySelectorAll('.main-nav__link')];
  }

  render(): void {
    const location = this.parseLocation().slice(1);
    const { Page } = this.findPage(this.routes) || { Page: ErrorPage };
    const page = new Page(this.rootElement);
    const main: RootElement = document.querySelector('main');

    if (main) {
      main.remove();
    }

    const header: RootElement = document.querySelector('header');
    header?.after(page.element);

    this.highlightRout(location);
  }

  private highlightRout(route: string): void {
    this.links.forEach((link) => {
      if (link.classList.contains('main-nav__link--active')) {
        link.classList.remove('main-nav__link--active');
      }
    });

    this.links.forEach((link) => {
      if (link.classList.contains(`main-nav__link--${route}`)) {
        link.classList.add('main-nav__link--active');
      }
    });
  }

  private parseLocation(): string {
    this.location = window.location.hash.slice(1) || '/about';
    return this.location;
  }

  private findPage(routes: RouteModel[]) {
    return routes.find((route: RouteModel) => route.path === this.location);
  }
}
