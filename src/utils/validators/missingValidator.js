const { check, param  } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getMissingValidator = [
  param ("id").isMongoId().withMessage("Invalid Missing id format"),
  validatorMiddleware,
];

exports.createMissingValidator = [
  check("address")
    .notEmpty()
    .withMessage("Missing address required")
    .isLength({ min: 3 })
    .withMessage("too short Missing address"),

  check("user").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateMissingValidator = [
  param ("id").isMongoId().withMessage("Invalid Missing id format"),

  check("address")
  .optional()
  .isLength({ min: 3 })
  .withMessage("too short Missing address"),
  validatorMiddleware,
];

exports.deleteMissingValidator = [
  param ("id").isMongoId().withMessage("Invalid Missing id format"),
  validatorMiddleware,
];
