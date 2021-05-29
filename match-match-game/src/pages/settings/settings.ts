import './settings.scss';
import { Component } from '../../components/component';
import { RootElement } from '../../components/cards-field/cards-field';
import { SettingSelect } from '../../components/setting-select/setting-select';
import { iDB } from '../../components/indexed-db/indexed-db';
import { GameSettings } from '../../models/game-settings-model';

export class Settings extends Component {
  cardsTypeSetting: SettingSelect;

  difficultySetting: SettingSelect;

  constructor(parentNode: RootElement) {
    super(parentNode, 'main', ['settings']);
    this.cardsTypeSetting = new SettingSelect(this.element, 'Game cards', 'select game cards type', [
      ['animals', 'Animals'],
      ['dogs', 'Dogs'],
    ]);

    this.difficultySetting = new SettingSelect(this.element, 'Difficulty', 'select game type', [
      ['4', '4x4'],
      ['6', '6x6'],
    ]);

    this.cardsTypeSetting.select.element.addEventListener('change', async () => {
      const settings: GameSettings[] = await iDB.readAll('settings');
      iDB.write('settings', {
        cardsType: (this.cardsTypeSetting.select.element as HTMLSelectElement).value,
        difficulty: settings[0].difficulty,
        id: 1,
      });
    });

    this.difficultySetting.select.element.addEventListener('change', async () => {
      const settings: GameSettings[] = await iDB.readAll('settings');
      iDB.write('settings', {
        cardsType: settings[0].cardsType,
        difficulty: +(this.difficultySetting.select.element as HTMLSelectElement).value,
        id: 1,
      });
    });
  }
}
