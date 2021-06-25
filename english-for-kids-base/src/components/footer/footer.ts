import './footer.scss';
import { Component } from '../component';
import { RootElement } from '../../models/root-element-model';
import githubLogo from '../../assets/images/github_logo.svg';
import courseLogo from '../../assets/images/rs_school_js.svg';

export class Footer extends Component {
  wrapper: Component;

  githubLink: Component;

  githubLogo: Component;

  year: Component;

  courseLogo: Component;

  courseLink: Component;

  constructor(parentNode: RootElement) {
    super(parentNode, 'footer', ['container', 'footer']);
    this.wrapper = new Component(this.element, 'div', ['footer__wrapper']);
    this.githubLink = new Component(this.wrapper.element, 'a', ['footer__github-link'], '', [
      ['href', 'https://github.com/icosagon8/'],
      ['target', 'blank'],
    ]);
    this.githubLogo = new Component(this.githubLink.element, 'img', ['footer__github-logo'], '', [
      ['src', `${githubLogo}`],
      ['width', '32'],
      ['height', '32'],
      ['alt', 'Github - icosagon8'],
    ]);
    this.year = new Component(this.wrapper.element, 'time', ['footer__year'], '2021', [['datetime', '2021']]);
    this.courseLink = new Component(this.wrapper.element, 'a', ['footer__course-link'], '', [
      ['href', 'https://rs.school/js/'],
      ['target', 'blank'],
    ]);
    this.courseLogo = new Component(this.courseLink.element, 'img', ['footer__course-logo'], '', [
      ['src', `${courseLogo}`],
      ['width', '100'],
      ['height', '37'],
      ['alt', 'RS School'],
    ]);
  }
}
