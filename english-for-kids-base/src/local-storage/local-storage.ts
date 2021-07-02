import { cards } from '../data/cards';
import { StatisticsModel } from '../models/statistics-model';

export const initLocalStorage = (): void => {
  const statisticsData = localStorage.getItem('statistics');

  if (!statisticsData) {
    const statistics: StatisticsModel[] = [];

    cards.forEach((elem) =>
      elem.words.forEach((item) => {
        statistics.push({ category: elem.category, word: item.word, translation: item.translation });
      })
    );

    localStorage.setItem('statistics', JSON.stringify(statistics));
  }
};
