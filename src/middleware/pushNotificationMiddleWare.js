const asyncHandler = require("express-async-handler");
const PushNotification = require("../config/firebase/firebase");
const notificationModel = require("../modules/notificationModel");

exports.creatMissingNotification = () =>
  asyncHandler(async (req, res,next) => {
    const title = req.body.document.name
      ? "There is someone missing next to you"
      : "there is something missing  next to you";

    await notificationModel
      .create({
        missing: req.body.document.id,
        user: req.body.document.user,
        title: title,
      })
      .then(() => {
        PushNotification({
          title: title,
          body: "I hope he is found as soon as possible",
        });
      });

      next();
  });
