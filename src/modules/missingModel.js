const mongoose = require("mongoose");
const notificationModel = require("./notificationModel");
const PushNotification = require("../config/firebase/firebase");
const { aiServices } = require("../services/connectInAiServices");

const missingSchema = new mongoose.Schema(
  {
    name: String,

    age: Number,

    address: {
      type: String,
      trim: true,
      required: [true, "address is required"],
      minlength: [3, "Too shory user address"],
    },

    clothesLastSeenWearing: String,

    describtion: String,

    image: String,

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
    const imageUrl = `${process.env.BASE_URL}/missing/${doc}`;
    doc = imageUrl;
    return doc;
  }
};

const creatMissingNotification = async (data) => {
  const title = data.name
    ? "There is someone missing next to you"
    : "there is something missing  next to you";

  await notificationModel
    .create({
      missing: data.id,
      user: data.user,
      title: title,
    })
    .then(() => {
      PushNotification({
        title: title,
        body: "I hope he is found as soon as possible",
      });
    });
};


//work in create data
missingSchema.post("save", async function (next) {
  await Promise.all([
    aiServices(this.image),
    creatMissingNotification({
      name: this.name,
      id: this._id,
      user: this.user,
    }),
  ]);

  this.image = setImageUrl(this.image);

  next();
});

missingSchema.pre(/^find/, async function (next) {
  this.populate({ path: "user", select: "name phone address _id" });

  next();
});

const missingChildModel = mongoose.model("missing", missingSchema);

module.exports = missingChildModel;
