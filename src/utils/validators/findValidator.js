const { check, param  } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getFindValidator = [
  param("id").isMongoId().withMessage("Invalid Find id format"),
  validatorMiddleware,
];

exports.createFindValidator = [
  check("address")
    .notEmpty()
    .withMessage("find address required")
    .isLength({ min: 3 })
    .withMessage("too short find address"),

  check("user").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateFindValidator = [
  param("id").isMongoId().withMessage("Invalid Find id format"),

  check("address")
  .optional()
  .isLength({ min: 3 })
  .withMessage("too short find address"),
  validatorMiddleware,
];

exports.deleteFindValidator = [
  param("id").isMongoId().withMessage("Invalid Find id format"),
  validatorMiddleware,
];
