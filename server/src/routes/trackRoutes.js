const Router = require("express").Router;
const trackRouter = Router();
const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:
trackRouter.get("/", authMiddleware, trackController.getAllTracks);
trackRouter.get("/get-track/:id", authMiddleware, trackController.getTrackById);
trackRouter.post("/upload-track", authMiddleware, trackController.uploadTrack);
trackRouter.delete(
  "/delete-track/:id",
  authMiddleware,
  trackController.deleteTrack,
);
trackRouter.patch(
  "/update-track/:id",
  authMiddleware,
  trackController.updateTrack,
);
trackRouter.patch(
  "/handler-track-like/",
  authMiddleware,
  trackController.handlerTrackLike,
);
trackRouter.patch(
  "/increment-total-plays/:id",
  authMiddleware,
  trackController.incrementTotalPlays,
);
trackRouter.get(
  "/get-track/:id/liked",
  authMiddleware,
  trackController.isLikedByUser,
);
trackRouter.get(
  "/get-most-played",
  authMiddleware,
  trackController.getMostPlayed,
);
trackRouter.get(
  "/get-most-liked",
  authMiddleware,
  trackController.getMostLiked,
);

module.exports = trackRouter;
