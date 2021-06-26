import { Header } from './components/header/header';
import { MainPage } from './pages/main';
import { Footer } from './components/footer/footer';

export class App {
  private readonly header: Header;

  private readonly page: MainPage;

  private readonly footer: Footer;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.page = new MainPage(this.rootElement, this.header.nav.highlightActiveMenuItem);
    this.footer = new Footer(this.rootElement);
  }
}
