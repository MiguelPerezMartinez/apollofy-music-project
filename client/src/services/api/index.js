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
<<<<<<< HEAD
  getTrackByName,
=======
  getTrackById,
>>>>>>> d437fdab99c1ea5036ca57e799c1bc0b6f752738
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
<<<<<<< HEAD
  getTrackByName,
=======
  getAllMyPlaylist,
  addTrackToPlaylist,
  createNewPlaylistApi,
>>>>>>> d437fdab99c1ea5036ca57e799c1bc0b6f752738
};
