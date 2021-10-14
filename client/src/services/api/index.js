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
} from "./trackManager";
import { changeMyProfilePicture } from "./fileUploader";
import {
  getAllMyPlaylist,
  addTrackToPlaylist,
  createNewPlaylistApi,
  deleteTrackFromPlaylistApi,
} from "./apiPlaylist";
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
  addTrackToPlaylist,
  createNewPlaylistApi,
  deleteTrackFromPlaylistApi,
};
