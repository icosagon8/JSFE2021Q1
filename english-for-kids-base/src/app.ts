import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Router } from './router/router';
import { routes } from './router/routes';
import { Component } from './components/component';
import { store } from './store/store';
import { initLocalStorage } from './local-storage/local-storage';

export class App {
  private readonly header: Header;

  private readonly main: Component;

  private readonly page: Router;

  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.main = new Component(this.rootElement, 'main');
    this.page = new Router(this.main.element, routes, this.header.nav.highlightActiveMenuItem);
    this.footer = new Footer(this.rootElement);

    store.subscribe(() => {
      const { isPlayMode } = store.getState().mode;

      if (isPlayMode) {
        this.rootElement.dataset.mode = 'play';
      } else {
        this.rootElement.dataset.mode = 'train';
      }
    });

    initLocalStorage();
  }
}
