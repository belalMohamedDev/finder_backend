const jwt = require("jsonwebtoken");

// @ dec this func to create token , use in login and signup
const creatToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIER_TIME,
  });

module.exports = creatToken;
