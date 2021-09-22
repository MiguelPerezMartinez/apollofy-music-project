const { userController } = require("../controllers");
const Router = require("express").Router;
//const  app  = require("../server")
const userRouter = Router();
const { authMiddleware } = require("../middlewares");

//end points routes:

userRouter.post("/register", userController.register);
