import {
  SHOW_DIALOGUE,
  HIDE_DIALOGUE,
  SHOW_UPDATE_MODAL,
  SHOW_DELETE_MODAL,
  SHOW_MY_PLAYLIST,
} from "./types";
import initialState from "./state";

const dialogueHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOGUE:
      return {
        ...state,
        active: true,
        trackDataDialog: action.payload.data,
        position: action.payload.position,
      };
    case SHOW_UPDATE_MODAL:
      return {
        ...state,
        showUpdate: action.playload,
      };
    case SHOW_DELETE_MODAL:
      return {
        ...state,
        showDelete: action.playload,
      };
    case SHOW_MY_PLAYLIST:
      return {
        ...state,
        showMyPlaylist: action.playload,
      };
    case HIDE_DIALOGUE:
      return initialState;
    default:
      return state;
  }
};

export default dialogueHandlerReducer;
