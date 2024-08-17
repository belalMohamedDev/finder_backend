
const findModel = require("../modules/findModel");
const resizeImage = require("../middleware/resizeImage");
const { uploadSingleImage } = require("../middleware/imageUploadMiddleware");
const factory = require("./handlerFactory");

//upload single image
exports.uploadFindImage = uploadSingleImage("image");

// rssize image before upload
exports.resizeFindImage = resizeImage("find");

// @ dec creat find 
// @ route Post  /api/vi/find
// @ access private
exports.creatFind= factory.creatOne(findModel, "find");

// @ dec get all  find  data
// @ route Get  /api/vi/find
// @ access private
exports.getAllFind = factory.getAllData(findModel, "find");

// @ dec get specific find 
// @ route Get  /api/vi/find/id
// @ access private
exports.getOneFind = factory.getOne(findModel, "find");

// @ dec update specific find 
// @ route Update  /api/vi/find/id
// @ access Private
exports.updateFind =  factory.updateOne(findModel, "find");


// @ dec delete specific find 
// @ route Update  /api/vi/find/id
// @ access Private
exports.deleteFind = factory.deleteOne(findModel, "find");






