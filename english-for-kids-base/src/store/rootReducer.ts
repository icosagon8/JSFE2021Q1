import { combineReducers } from 'redux';
import { pageReducer } from './page/reducer';
import { modeReducer } from './play-mode/reducer';

export const rootReducer = combineReducers({
  page: pageReducer,
  mode: modeReducer,
});
