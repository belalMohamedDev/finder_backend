const ApiError = require("../utils/apiError/apiError");
const {deleteImage} = require("../utils/deleteImage/deleteImage");

const handleJwtInvalidSignature = () =>
  new ApiError("Invalid token ,please login again..", 401);

const handleTokenExpiredError = () =>
  new ApiError("expired token ,please login again..", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // delete image uploaded in erorr
  deleteImage(req);
  
  if (process.env.NODE_ENV === "development") {

    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError();

    sendErrorForProd(err, res);
  }
};

const sendErrorForProd = (err, res) => res.status(err.statusCode).json({
    status: false,
    statusCode:err.statusCode,
    message: err.message,
  });

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    "status Code": err.statusCode,
    error: err,
    Message: err.message,
    stack: err.stack,
  });
module.exports = globalError;
