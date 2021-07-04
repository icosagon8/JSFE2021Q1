import { CardWord } from '../../components/card-word/card-word';
import { MAX_CARD_REPEAT } from '../../helpers/constants';
import { StatisticsModel } from '../../models/statistics-model';
import { getWordData } from '../../services/cards-services';
import { Category } from '../category/category';

export class DifficultWords extends Category {
  addCategoryCards(): void {
    const statisticsData = <string>localStorage.getItem('statistics');
    const statistics: StatisticsModel[] = JSON.parse(statisticsData);
    const wordsData = statistics
      .filter((item) => item.miss)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, MAX_CARD_REPEAT);

    if (!wordsData.length) {
      this.cardsField.element.remove();
    } else {
      wordsData.forEach((cardData) => {
        const wordData = getWordData(cardData.category, cardData.word);
        const card = new CardWord(this.cardsField.container.element, wordData, cardData.category);
        this.cards.push(card);
      });
    }
  }
}
