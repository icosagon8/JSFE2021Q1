import './timer.scss';
import { Component } from '../component';
import { RootElement } from '../cards-field/cards-field';

export class Timer extends Component {
  private startTime: number;

  sec: string;

  min: string;

  private timerId!: NodeJS.Timeout;

  constructor(parentNode: RootElement) {
    super(parentNode, 'div', ['timer'], '00:00');
    this.startTime = 0;
    this.sec = '';
    this.min = '';
  }

  start(): void {
    this.startTime = Date.now();
    this.timerId = setInterval(() => this.showTime(), 1000);
  }

  stop(): void {
    clearTimeout(this.timerId);
  }

  showTime(): void {
    this.element.textContent = this.toMMSS(Date.now() - this.startTime);
  }

  toMMSS(time: number): string {
    this.sec = `${Math.floor(time / 1000) % 60}`.padStart(2, '0');
    this.min = `${Math.floor(time / 60000)}`.padStart(2, '0');

    return `${this.min}:${this.sec}`;
  }

  getSeconds(): number {
    return +this.min * 60 + +this.sec;
  }
}
