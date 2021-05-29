import { Header } from './components/header/header';
import { iDB } from './components/indexed-db/indexed-db';
import { Router } from './router/router';

export class App {
  private readonly header: Header;

  private readonly router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    iDB.init('icosagon8');
    this.header = new Header(this.rootElement);
    this.router = new Router(this.rootElement);
    setTimeout(() => this.router.render());
    this.hashChangeHandler();
  }

  private hashChangeHandler() {
    window.addEventListener('hashchange', () => this.router.render());
  }
}
