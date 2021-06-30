import { Reducer } from 'redux';
import { CHANGE_PLAY_MODE } from './actions';
import { PlayModeState } from './types';

export const initialState: PlayModeState = {
  isPlayMode: false,
};

export const modeReducer: Reducer<PlayModeState> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PLAY_MODE:
      return { ...state, isPlayMode: !state.isPlayMode };
    default:
      return state;
  }
};
