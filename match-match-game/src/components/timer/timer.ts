import { BaseComponent } from '../base-component';
import './timer.scss';

export class Timer extends BaseComponent {
  private startTime: number;

  private sec: string;

  private min: string;

  private timerId!: NodeJS.Timeout;

  constructor() {
    super('div', ['timer']);
    this.startTime = 0;
    this.sec = '';
    this.min = '';
  }

  start(): void {
    this.element.textContent = '00:00';
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
}
