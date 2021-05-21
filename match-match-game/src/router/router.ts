import { RouteModel } from '../models/route-model';
import { About } from '../pages/about/about';
import { ErrorPage } from '../pages/error/error';
import { Game } from '../pages/game/game';
import { Score } from '../pages/score/score';
import { Settings } from '../pages/settings/settings';

export class Router {
  private location?: string;

  private readonly routes: RouteModel[];

  constructor() {
    this.routes = [
      { path: '/', Page: Game },
      { path: '/about', Page: About },
      { path: '/score', Page: Score },
      { path: '/settings', Page: Settings },
    ];
  }

  render(): void {
    this.parseLocation();
    const { Page } = this.findPage(this.routes) || { Page: ErrorPage };
    const page = new Page();
    const main: HTMLElement | null = document.querySelector('main');

    if (main) {
      main.remove();
    }

    document.body.appendChild(page.element);
  }

  private parseLocation(): string {
    this.location = window.location.hash.slice(1) || '/';
    return this.location;
  }

  private findPage(routes1: RouteModel[]) {
    return routes1.find((route: RouteModel) => route.path === this.location);
  }
}
