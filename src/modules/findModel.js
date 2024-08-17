const mongoose = require("mongoose");
const notificationModel = require("./notificationModel");
const PushNotification = require("../config/firebase/firebase");

const findSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
      required: [true, "address is required"],
      minlength: [3, "Too shory find  address"],
    },

    image: String,
    description: String,

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  //return image base url + image name
  if (doc) {
    const imageUrl = `${process.env.BASE_URL}/find/${doc}`;
    doc = imageUrl;
    return doc;
  }
};

const creatFoundNotification = async (data) => {
  const title = "he found something near you";

  await notificationModel
    .create({
      find: data.id,
      user: data.user,
      title: title,
    })
    .then(() => {
      PushNotification({
        title: title,
        body: "I hope he returns to his family as soon as possible, and I hope you know him",
      });
    });
};
//work in create data
findSchema.pre("save", async function (next) {
  // return bath image
  this.image = setImageUrl(this.image);
  this.populate({ path: "user", select: "name image address _id" });

  //create notification
  creatFoundNotification({ id: this._id, user: this.user });

  next();
});

findSchema.pre(/^find/, async function (next) {
  this.populate({ path: "user", select: "name phone address-_id" });

  next();
});

const findChildModel = mongoose.model("find", findSchema);

module.exports = findChildModel;
