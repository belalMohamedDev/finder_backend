
const missingModel = require("../modules/missingModel");
const resizeImage = require("../middleware/resizeImage");
const { uploadSingleImage } = require("../middleware/imageUploadMiddleware");



const factory = require("./handlerFactory");

//upload single image
exports.uploadMissingImage = uploadSingleImage("image");

// rssize image before upload
exports.resizeMissingImage = resizeImage("missing");

// @ dec creat missing 
// @ route Post  /api/vi/missing
// @ access private
exports.creatMissing = factory.creatOne(missingModel, "missing");

// @ dec get all  missing  data
// @ route Get  /api/vi/missing
// @ access private
exports.getAllMissing = factory.getAllData(missingModel, "missing");

// @ dec get specific missing 
// @ route Get  /api/vi/missing/id
// @ access private
exports.getOneMissing = factory.getOne(missingModel, "missing");

// @ dec update specific missing 
// @ route Update  /api/vi/missing/id
// @ access Private
exports.updateMissing =  factory.updateOne(missingModel, "missing");


// @ dec delete specific missing 
// @ route Update  /api/vi/missing/id
// @ access Private
exports.deleteMissing = factory.deleteOne(missingModel, "missing");










