import { RouteModel } from '../models/route-model';

export class Router {
  location?: string;

  constructor(
    private rootElement: HTMLElement,
    private readonly routes: RouteModel[],
    private readonly headerNavCallback: (menuItemData: HTMLElement | string) => void
  ) {
    this.render();
    this.hashChangeHandler();
  }

  render(): void {
    this.parseLocation();
    const { Page } = <RouteModel>this.findPage();
    const page = this.location === '' ? new Page(this.rootElement, this.headerNavCallback) : new Page(this.rootElement);
    this.rootElement.replaceWith(page.element);
    this.rootElement = page.element;
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
