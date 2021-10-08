import initialTrackState from "./state";
import {
  IS_PLAY_BAR_DISPLAYED,
  IS_PLAYING,
  TRACK_OBJECT,
  WAVESURFER_PROPERTIES,
  SET_POSITION_IN_HISTORY,
} from "./type";

const trackReducer = (state = initialTrackState, action) => {
  switch (action.type) {
    case IS_PLAY_BAR_DISPLAYED:
      return { ...state, isPlayBarDisplayed: action.payload };
    case IS_PLAYING:
      return { ...state, isPlaying: action.payload };
    case TRACK_OBJECT:
      return { ...state, trackObject: action.payload };
    case WAVESURFER_PROPERTIES:
      return { ...state, waveSurfer: action.payload };
    case SET_POSITION_IN_HISTORY:
      return { ...state, positionInHistory: action.payload };
    default:
      return state;
  }
};

export default trackReducer;
