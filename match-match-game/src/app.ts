import { Header } from './components/header/header';
import { Router } from './router/router';

export class App {
  private readonly header: Header;

  private readonly router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.router = new Router(this.rootElement);
    this.router.render();
    this.hashChangeHandler();
  }

  private hashChangeHandler() {
    window.addEventListener('hashchange', () => this.router.render());
  }
}
