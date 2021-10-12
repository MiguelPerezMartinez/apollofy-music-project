const Router = require("express").Router;
const userRouter = Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:
userRouter.post("/register", userController.register);
userRouter.get("/get-user/:id", authMiddleware, userController.getById);
userRouter.get(
  "/get-user/:id/my-tracks",
  authMiddleware,
  userController.getMyTracksById,
);
userRouter.get(
  "/get-user/:id/favourite-tracks",
  authMiddleware,
  userController.getFavouriteTracksById,
);
userRouter.patch(
  "/update-user/:id",
  authMiddleware,
  userController.updateProfile,
);
userRouter.patch(
  "/set-track-history/:id",
  authMiddleware,
  userController.setTrackHistory,
);
module.exports = userRouter;
