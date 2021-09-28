import initialTrackState from "./state";
import {
  IS_PLAY_VAR_DISPLAYED,
  IS_PLAYING,
  TRACK_OBJECT,
  NOT_PLAY_VAR_DISPLAYED,
  NOT_PLAYING,
} from "./type";

const trackReducer = (state = initialTrackState, action) => {
  switch (action.type) {
    case IS_PLAY_VAR_DISPLAYED:
      return { ...state, isPlayVarDisplaye: true };
    case IS_PLAYING:
      return { ...state, isPlaying: true };
    case NOT_PLAY_VAR_DISPLAYED:
      return { ...state, isPlayVarDisplaye: false };
    case NOT_PLAYING:
      return { ...state, isPlaying: false };
    case TRACK_OBJECT:
      return { ...state, trackObject: action.payload };
    default:
      return state;
  }
};

export default trackReducer;
