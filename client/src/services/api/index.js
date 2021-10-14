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
} from "./apiAuth";

import {
  apiTrackUpload,
  addTotalPlay,
  deleteTrack,
  updateTrack,
  getTrackById,
} from "./trackManager";
import { changeMyProfilePicture } from "./fileUploader";
import {
  getAllMyPlaylist,
  addTrackToPlaylist,
  createNewPlaylistApi,
} from "./apiPlaylist";
export {
  getTrackById,
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
  addTrackToPlaylist,
  createNewPlaylistApi,
};
