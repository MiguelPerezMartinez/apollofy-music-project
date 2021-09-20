import { SHOW_TRACK, CHANGE_TRACK } from "../actions/action.js";

let reducer = (state = { track: "Dream Works" }, action) => {
  switch (action.type) {
    case CHANGE_TRACK:
      return { track: action.track };
    case SHOW_TRACK:
      console.log("Track: ", state.track);
      return state;

    default:
      return state;
  }
};

export default reducer;
