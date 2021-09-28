import {
  IS_PLAY_VAR_DISPLAYED,
  IS_PLAYING,
  TRACK_OBJECT,
  NOT_PLAY_VAR_DISPLAYED,
  NOT_PLAYING,
} from "./type";

export const isPlayVarDisplayed = () => ({ type: IS_PLAY_VAR_DISPLAYED });
export const isPlaying = () => ({ type: IS_PLAYING });
export const notPlayVarDisplayed = () => ({ type: NOT_PLAY_VAR_DISPLAYED });
export const notPlaying = () => ({ type: NOT_PLAYING });
export const trackObject = (value) => ({ type: TRACK_OBJECT, payload: value });
