const asyncHandler = require("express-async-handler");
const notificationModel = require("../modules/notificationModel");


exports.getNotification = asyncHandler(async (req, res, next) => {
  //this code get one data from db using id
  const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

  const notificationDocument = await notificationModel
    .find({ "user": { "$ne": req.userModel._id } })
    .populate({
      path: "user",
  
    }) .populate({
      path: "find",
    
    })
    .populate({
      path: "missing",
     
    }).sort( {'updatedAt':-1} ).skip(skip).limit(limit);
 

  //send success respons
  res.status(200).json({
    status: true,
    message: `Sucess To get all notification data from this id`,
    result: notificationDocument.length,
    page: page,
    data: notificationDocument,
  });
});
