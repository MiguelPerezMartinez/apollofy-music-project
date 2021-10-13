import {
  SHOW_DIALOGUE,
  HIDE_DIALOGUE,
  SHOW_UPDATE_MODAL,
  SHOW_DELETE_MODAL,
  SHOW_MY_PLAYLIST,
} from "./types";

export const showDialogue = (data, position) => ({
  type: SHOW_DIALOGUE,
  payload: { data, position },
});
export const hideDialogue = () => ({ type: HIDE_DIALOGUE });
export const showUpdateAction = (value) => ({
  type: SHOW_UPDATE_MODAL,
  playload: value,
});
export const showDeleteAction = (value) => ({
  type: SHOW_DELETE_MODAL,
  playload: value,
});

export const showMyPlaylistAction = (value) => ({
  type: SHOW_MY_PLAYLIST,
  playload: value,
});
