import { createStore } from 'redux';
import { initialState } from './initialState';
import { pageReducer } from './page/reducer';

export const store = createStore(pageReducer, initialState);
