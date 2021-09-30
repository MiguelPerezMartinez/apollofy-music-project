const Router = require("express").Router;
const trackRouter = Router();
const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:
trackRouter.get("/", trackController.getAllTracks);
trackRouter.get("/get-track/:id", trackController.getTrackById);
trackRouter.post("/upload-track", trackController.uploadTrack);
trackRouter.delete("/delete-track/:id", trackController.deleteTrack);
trackRouter.patch("/update-track/:id", trackController.updateTrack);
trackRouter.patch("/handler-track-like/", trackController.handlerTrackLike);

module.exports = trackRouter;
