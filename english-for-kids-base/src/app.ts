import { Component } from './components/component';
import { Header } from './components/header/header';

export class App {
  private readonly header: Component;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
  }
}
