const express = require("express");
const {
  getNotification

} = require("../services/notificationService");



const authServices = require("../services/authServiece");

const router = express.Router();
router.use(authServices.protect);

router.route("/").get(getNotification);


module.exports = router;
