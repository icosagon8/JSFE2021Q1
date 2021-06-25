import { Component } from './components/component';
import { Header } from './components/header/header';
import { MainPage } from './pages/main';

export class App {
  private readonly header: Component;

  private readonly page: MainPage;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.page = new MainPage(this.rootElement);
  }
}
