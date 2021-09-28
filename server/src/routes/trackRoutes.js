const Router = require("express").Router;
const trackRouter = Router();
const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:
trackRouter.get("/get-track/:id", trackController.getById);
trackRouter.post("/upload-track", trackController.uploadTrack);
trackRouter.delete("/delete-track/:id", trackController.deleteTrack);

module.exports = trackRouter;
