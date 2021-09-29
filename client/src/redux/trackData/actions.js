import { IS_PLAY_BAR_DISPLAYED, IS_PLAYING, TRACK_OBJECT } from "./type";

export const isPlayBarDisplayed = (value) => ({
  type: IS_PLAY_BAR_DISPLAYED,
  payload: value,
});
export const isPlaying = (value) => ({ type: IS_PLAYING, payload: value });
export const trackObjectAction = (value) => ({
  type: TRACK_OBJECT,
  payload: value,
});
