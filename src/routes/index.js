
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const findRoute = require("./findRoute");
const missingRoute = require("./missingRoute");
const notificationRoute = require("./notificationRoute");




const mountRoute = (app) => {

    app.use("/v1/api/user", userRoute);
    app.use("/v1/api/auth", authRoute);
    app.use("/v1/api/find", findRoute);
    app.use("/v1/api/missing", missingRoute);
    app.use("/v1/api/notification", notificationRoute);
  };
  


  module.exports = mountRoute;