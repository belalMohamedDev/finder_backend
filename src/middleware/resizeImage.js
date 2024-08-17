const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
//image processing
const resizeImage = (directorName) =>
  asyncHandler(async (req, res, next) => {
    //create path to image
    const filename = `${directorName}-${uuidv4()}-${Date.now()}.jpeg`;
    const directorPath = `src/uploads/${directorName}`;
    const filePath = `${directorPath}/${filename}`;

    if (req.file) {
      //processing in image before uploade
      await sharp(req.file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filePath);

      //save image into our database
      req.body.image = filename;
      req.body.directorUrl = directorPath;
      req.body.imageUrl = filePath;
    }
    next();
  });

module.exports = resizeImage;
