const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const UserModel = require("../../modules/userModel");

exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 3 })
    .withMessage("too short User name"),

  check("phone")
    .notEmpty()
    .withMessage("User phone required")
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt phone numbers")
    .custom(
      asyncHandler(async (val) => {
        const phoneUser = await UserModel.findOne({ phone: val });
        if (phoneUser) {
          throw new Error("phone already in user");
        }
      })
    ),



  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
 

  check("address").notEmpty().withMessage("User address required"),

  validatorMiddleware,
];

exports.loginValidator = [
  check("phone")
    .notEmpty()
    .withMessage("User phone required")
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt phone numbers"),

  check("password")
    .notEmpty()
    .withMessage("user password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters "),

  validatorMiddleware,
];
