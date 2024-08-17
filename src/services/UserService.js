const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const userModel = require("../modules/userModel");
const resizeImage = require("../middleware/resizeImage");
const { uploadSingleImage } = require("../middleware/imageUploadMiddleware");
const { deleteImage } = require("../utils/deleteImage/deleteImage");
const creatToken = require("../utils/generate token/createToken");
const factory = require("./handlerFactory");


//upload single image
const uploadUserImage = uploadSingleImage("image");

// rssize image before upload
const resizeUserImage = resizeImage("user");


//  @dec    get specific user by id
//  @route  Get  /api/v1/users/:id
//  @access Private
const getUser = factory.getOne(userModel,"user");

// @ dec get logged user data
// @ route get  /api/vi/user/getMe
// @ access private/protect
const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.userModel._id;
  next();
});




// @ dec update logged user password
// @ route Update  /api/vi/user/updateMyPassword
// @ access private/protect
const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  //update user password based user payload
  const document = await userModel.findByIdAndUpdate(
    req.userModel._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );


  //generate token
  const token = creatToken(req.userModel._id);

  res.status(200).json({
    status: true,
    message: `Sucess To Update User password from this id`,
    token: token,
    data: document,
  });
});




// @ dec update logged user data
// @ route Update  /api/vi/user/updateMyData
// @ access private/protect
const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  //update user data based user payload
  const document = await userModel.findByIdAndUpdate(
    req.userModel._id,
    {
      name: req.body.name,
      email: req.body.address,
      phone: req.body.phone,
  

    },
    { new: true }
  );

  res.status(200).json({
    status: true,
    message: `Sucess To Update User data from this id`,
    data: document,
  });
});

// @ dec update logged user image
// @ route Update  /api/vi/user/updateMyImage
// @ access private/protect
const updateLoggedUserImage = asyncHandler(async (req, res, next) => {
  //update user data based user payload
  const document = await userModel.findOne(req.userModel._id);

  if (document.image) {
    //delete old image
    deleteImage(req, document.image);
  }

  document.image = req.body.image;
  await document.save();

  res.status(200).json({
    status: true,
    message: `Sucess To Update User image from this id.....`,
    data: document,
  });
});

// @ dec delete logged user
// @ route Update  /api/vi/user/deleteMe
// @ access private/protect
const deleteLoggedUser = asyncHandler(async (req, res, next) => {
  //delete user  based user payload

  await userModel.findByIdAndUpdate(
    req.userModel._id,
    {
      active: false,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: true,
    message: `Sucess To delete User  from this id`,
  });
});

module.exports = {
  getLoggedUserData,
  updateLoggedUserImage,
  updateLoggedUserData,
  updateLoggedUserPassword,
  deleteLoggedUser,
  uploadUserImage,
  resizeUserImage,
  getUser,

};
