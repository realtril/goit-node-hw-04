const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateAuth } = require("../helpers/validate");
const userRouter = Router();
const Joi = require("joi");

const UserScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

userRouter.post(
  "/register",
  validateAuth(UserScheme),
  userController.createUser
);

userRouter.post("/login", validateAuth(UserScheme), userController.logIn);

userRouter.get(
  "/current",
  userController.authorize,
  userController.getCurrentUser
);

userRouter.post("/logout", userController.authorize, userController.logOut);

module.exports = userRouter;
