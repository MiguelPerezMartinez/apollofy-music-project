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
  getPlaylistById,
  getMostLikedPlaylists,
  getLastUploadedPlaylists,
  addTrackToPlaylist,
  createNewPlaylistApi,
  deleteTrackFromPlaylistApi,
} from "./apiPlaylist";

import {
  getTrackById,
  getTracksByTitle,
  getTracksByAuthor,
  getTracksByAlbum,
  getTracksByGenre,
} from "./apiTrack";

import {
  getAllMyPlaylists,
  getAllMyFavPlaylists,
  getTotalPlays,
  getTotalTracks,
} from "./apiUser";

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
  getTrackById,
  getTracksByTitle,
  getTracksByAuthor,
  getTracksByAlbum,
  getTracksByGenre,
  getAllMyPlaylists,
  getPlaylistById,
  getMostLikedPlaylists,
  getLastUploadedPlaylists,
  addTrackToPlaylist,
  createNewPlaylistApi,
  deleteTrackFromPlaylistApi,
  getAllMyFavPlaylists,
  getTotalPlays,
  getTotalTracks,
};
