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

module.exports = trackRouter;
