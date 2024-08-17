const asyncHandler = require("express-async-handler");
const axios = require("axios");

exports.aiServices = asyncHandler(async (imageUrl) => {
    await axios.post("http://192.168.182.2:4050/v1/api/ai/AddNewItem", {
      image: imageUrl,
    });

});
