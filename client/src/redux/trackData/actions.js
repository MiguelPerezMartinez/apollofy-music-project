import {
  IS_PLAY_BAR_DISPLAYED,
  IS_PLAYING,
  TRACK_OBJECT,
  WAVESURFER_PROPERTIES,
  SET_POSITION_IN_HISTORY,
  RELOAD_FETCH,
} from "./type";

//Reproductor (Solo cambia a true)
export const isPlayBarDisplayedAction = (value) => ({
  type: IS_PLAY_BAR_DISPLAYED,
  payload: value,
});

// Se esta reproduciendo la song ?
export const isPlay = (value) => ({ type: IS_PLAYING, payload: value });
export const trackObjectAction = (value) => ({
  type: TRACK_OBJECT,
  payload: value,
});

export const setWaveSurfer = (value) => ({
  type: WAVESURFER_PROPERTIES,
  payload: value,
});

export const setPositionInHistory = (value) => ({
  type: SET_POSITION_IN_HISTORY,
  payload: value,
});

export const reloadFetchAction = (value) => ({
  type: RELOAD_FETCH,
  payload: value,
});
