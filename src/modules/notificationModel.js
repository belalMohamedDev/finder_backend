const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,

    find: {
      type: mongoose.Schema.ObjectId,
      ref: "find",
    },

    missing: {
      type: mongoose.Schema.ObjectId,
      ref: "missing",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const notificationChildModel = mongoose.model(
  "notification",
  notificationSchema
);

module.exports = notificationChildModel;
