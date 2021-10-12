const Router = require("express").Router;
const playlistRouter = Router();
const { playlistController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end point routes:
playlistRouter.post(
  "/create-playlist",
  authMiddleware,
  playlistController.createPlaylist,
);
playlistRouter.patch(
  "/update-playlist/:id",
  authMiddleware,
  playlistController.updatePlaylistById,
);
playlistRouter.patch(
  "/delete-playlist-track",
  authMiddleware,
  playlistController.deleteTrackFromPlaylist,
);
playlistRouter.delete(
  "/delete-playlist/:id",
  authMiddleware,
  playlistController.deletePlaylistById,
);
playlistRouter.get(
  "/",
  authMiddleware,
  playlistController.getAllPlaylists,
);
playlistRouter.get(
  "/get-playlist/:id",
  authMiddleware,
  playlistController.getPlaylistById,
);

//exports
module.exports = playlistRouter;
