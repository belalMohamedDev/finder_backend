const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError/apiError");
const userModel = require("../modules/userModel");
const creatToken = require("../utils/generate token/createToken");

// @ dec sign Up
// @ route Post  /api/vi/auth/signUp
// @ access Public
const signUp = asyncHandler(async (req, res, next) => {
  // create user
  const document = await userModel.create(req.body);

  //generate token
  const token = creatToken(document._id);

  //send success response
  res.status(201).json({
    status: true,
    message: `Sucess Create user`,
    token: token,
    data: document,
  });
});

// @ dec login
// @ route Post  /api/vi/auth/login
// @ access Public
const login = asyncHandler(async (req, res, next) => {
  //check if user exist & check if password is correct

  const document = await userModel.findOne({ phone: req.body.phone });
  if (
    !document ||
    !(await bcrypt.compare(req.body.password, document.password))
  ) {
    return next(new ApiError("Incorrect phone or password.", 404));
  }

  //generate token
  const token = creatToken(document._id);

  //send success response to client side
  res.status(201).json({
    status: true,
    message: `Success login in app`,
    token: token,
    data: document,
  });
});

// @ dec access protect(user)
// make sure the user is logged in
const protect = asyncHandler(async (req, res, next) => {
  //check if token exist , if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(
        "you are not login ,please login to get access this route",
        401
      )
    );
  }

  // verify token (no change happnes ,expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //check  if user exists
  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does no longer exist",
        401
      )
    );
  }

  //check user active or no
  if (currentUser.active === false) {
    return next(
      new ApiError(
        "this account not active ,please go to actived with login",
        401
      )
    );
  }




  // check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );



    // password changed after token created (error)
    if (passwordChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "user recntly changed his password ,please login again....",
          401
        )
      );
    }
  }



  //using in allowed permision
  req.userModel = currentUser;



  next();
});


// @ this function used to add user id in body
const addUserIdToBody = asyncHandler(async (req, res, next) => {
  req.body.user = req.userModel._id;
  next();
});

module.exports = {
  signUp,
  login,
  protect,
  addUserIdToBody
};
