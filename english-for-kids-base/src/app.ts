import { Component } from './components/component';
import { Header } from './components/header/header';
import { MainPage } from './pages/main';
import { Footer } from './components/footer/footer';

export class App {
  private readonly header: Component;

  private readonly page: MainPage;

  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.page = new MainPage(this.rootElement);
    this.footer = new Footer(this.rootElement);
  }
}
