import {
  registerInApi,
  getById,
  getCurrentUser,
  updateCurrentUser,
  updateById,
  setIsActive,
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
  getAllMyPlaylist,
} from "./apiAuth";

import {
  apiTrackUpload,
  addTotalPlay,
  deleteTrack,
  updateTrack,
} from "./trackManager";
import { changeMyProfilePicture } from "./fileUploader";

export {
  registerInApi,
  getById,
  getCurrentUser,
  updateCurrentUser,
  updateById,
  setIsActive,
  apiTrackUpload,
  changeMyProfilePicture,
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
  addTotalPlay,
  deleteTrack,
  updateTrack,
  getAllMyPlaylist,
};
