import { cards } from '../data/cards';
import { StatisticsModel } from '../models/statistics-model';

export const initLocalStorage = (): void => {
  const statisticsData = localStorage.getItem('statistics');

  if (!statisticsData) {
    const statistics: StatisticsModel[] = [];

    cards.forEach((categoryData) =>
      categoryData.words.forEach((wordData) => {
        statistics.push({
          category: categoryData.category,
          word: wordData.word,
          translation: wordData.translation,
          click: 0,
          hit: 0,
          miss: 0,
          percent: 0,
        });
      })
    );

    localStorage.setItem('statistics', JSON.stringify(statistics));
  }
};
