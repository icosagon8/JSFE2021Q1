export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    if (styles.length) {
      this.element.classList.add(...styles);
    }
  }
}
