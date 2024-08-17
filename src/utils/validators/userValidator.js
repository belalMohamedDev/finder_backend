const { check, body } = require("express-validator");

const bcrypt = require("bcrypt");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const UserModel = require("../../modules/userModel");

exports.changeLoggedUserPasswordValidator = [
  check("currentPassword").notEmpty().withMessage("current Password required"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation required"),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long")
    .custom(async (val, { req }) => {
      //1) verify current password
      const user = await UserModel.findById(req.userModel._id);
      if (!user) {
        throw new Error("there is no user with id");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error("password confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short User name"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt phone numbers"),

  validatorMiddleware,
];
