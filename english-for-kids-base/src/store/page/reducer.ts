import { Reducer } from 'redux';
import { InitialStateModel } from '../../models/initial-state-model';
import { initialState } from '../initialState';
import { UPDATE_PAGE } from './actions';

export const pageReducer: Reducer<InitialStateModel> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, page: action.text };
    default:
      return state;
  }
};
