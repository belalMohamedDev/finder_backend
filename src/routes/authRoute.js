const express = require("express");
const { signUp, login } = require("../services/authServiece");

const { uploadUserImage, resizeUserImage } = require("../services/UserService");

const {
  loginValidator,
  signUpValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router
  .route("/signUp")
  .post(uploadUserImage, resizeUserImage, signUpValidator, signUp);

router.route("/login").post(loginValidator, login);

module.exports = router;
