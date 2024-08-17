const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User Name is Required"],
    },

    phone: {
      type: String,
      trim: true,
      unique: [true, "phone must be uniqe"],
      required: [true, "phone is required"],
     
    },

    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "Too shory user password"],
    },

   
    passwordChangedAt: Date,
    image: String,
    address: String,
    active:{
      type:Boolean,
      default:true
    }
  


  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  //return image base url + image name
  if (doc) {
    const imageUrl = `${process.env.BASE_URL}/user/${doc}`;
    return imageUrl;
  }
};

//work in create data
userSchema.pre("save", async function (next) {
  this.image = setImageUrl(this.image);
  if (!this.isModified("password")) return next();
  //hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
