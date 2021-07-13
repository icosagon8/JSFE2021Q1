import { Router } from './router/router';
import { store } from './store/store';
import { initLocalStorage } from './local-storage/local-storage';

export class App {
  private readonly page: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.page = new Router(rootElement);

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
