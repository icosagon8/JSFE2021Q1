import { StatisticsModel } from '../models/statistics-model';
import { getCategoriesData, getWordsData } from '../services/api';

export const initLocalStorage = async (): Promise<void> => {
  const statisticsData = localStorage.getItem('statistics');

  if (!statisticsData) {
    const statistics: StatisticsModel[] = [];
    const wordsData = await getWordsData();
    const categoryData = await getCategoriesData();

    wordsData.forEach((wordData) => {
      statistics.push({
        category: <string>categoryData.find((category) => category.id === wordData.categoryId)?.category,
        word: wordData.word,
        translation: wordData.translation,
        click: 0,
        hit: 0,
        miss: 0,
        percent: 0,
        id: wordData.id,
      });
    });

    localStorage.setItem('statistics', JSON.stringify(statistics));
  }
};
