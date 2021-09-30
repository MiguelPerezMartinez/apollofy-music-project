import { IS_PLAY_BAR_DISPLAYED, IS_PLAYING, TRACK_OBJECT } from "./type";
//Reproductor (Solo cambia a true)
export const isPlayBarDisplayed = (value) => ({
  type: IS_PLAY_BAR_DISPLAYED,
  payload: value,
});

// Se esta reproduciendo la song ?
export const isPlaying = (value) => ({ type: IS_PLAYING, payload: value });
export const trackObjectAction = (value) => ({
  type: TRACK_OBJECT,
  payload: value,
});
