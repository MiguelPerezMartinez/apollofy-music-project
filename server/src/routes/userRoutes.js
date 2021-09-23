const Router = require("express").Router;
//const  app  = require("../server")
const userRouter = Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//end points routes:

userRouter.post("/register", userController.register);
userRouter.get("/getUser/:id", authMiddleware, userController.getById);

module.exports = userRouter;
