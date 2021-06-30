export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';

interface PlayModeAction {
  type: string;
}

export const setPlayMode = (): PlayModeAction => ({
  type: CHANGE_PLAY_MODE,
});
