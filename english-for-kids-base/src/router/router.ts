import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { RouteModel } from '../models/route-model';
import { Admin } from '../pages/admin/admin';
import { getRoutes } from './routes';

export class Router {
  location?: string;

  routes: RouteModel[];

  constructor(private rootElement: HTMLElement) {
    this.routes = [];
    this.render();
    this.hashChangeHandler();
  }

  async render(): Promise<void> {
    this.routes = await getRoutes();
    this.parseLocation();
    const { Page } = <RouteModel>this.findPage();
    document.body.innerHTML = '';

    if (Page === Admin) {
      (() => new Page(document.body))();
    } else {
      (() => new Header(this.rootElement, this.routes))();
      (() => new Page(this.rootElement))();
      (() => new Footer(this.rootElement))();
    }
  }

  private parseLocation(): void {
    this.location = window.location.hash.slice(2);
  }

  private findPage() {
    return this.routes.find((route: RouteModel) => route.path === this.location);
  }

  private hashChangeHandler() {
    window.addEventListener('hashchange', () => this.render());
  }
}
