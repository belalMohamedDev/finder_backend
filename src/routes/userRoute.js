const express = require("express");
const authServices = require("../services/authServiece");
const {
  getUser,
  uploadUserImage,
  resizeUserImage,
  getLoggedUserData,
  updateLoggedUserImage,
  updateLoggedUserData,
  updateLoggedUserPassword,
  deleteLoggedUser,
} = require("../services/UserService");

const {
  changeLoggedUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router.use(authServices.protect);
router.route("/getMe").get(getLoggedUserData, getUser);
router
  .route("/updateMyData")
  .put(updateLoggedUserValidator, updateLoggedUserData);
router
  .route("/updateMyImage")
  .put(uploadUserImage, resizeUserImage, updateLoggedUserImage);
router
  .route("/updateMyPassword")
  .put(changeLoggedUserPasswordValidator, updateLoggedUserPassword);
router.route("/deleteMe").delete(deleteLoggedUser);

module.exports = router;
