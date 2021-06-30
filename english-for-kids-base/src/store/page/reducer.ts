import { Reducer } from 'redux';
import { UPDATE_PAGE } from './actions';
import { PageState } from './types';

export const initialState: PageState = {
  category: 'Main Page',
};

export const pageReducer: Reducer<PageState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, category: action.text };
    default:
      return state;
  }
};
