const express = require("express");
const {
  creatMissing,
  deleteMissing,
  getAllMissing,
  getOneMissing,
  resizeMissingImage,
  updateMissing,
  uploadMissingImage,

} = require("../services/missingService");

const {
  createMissingValidator,
  deleteMissingValidator,
  getMissingValidator,
  updateMissingValidator,
} = require("../utils/validators/missingValidator");

const authServices = require("../services/authServiece");

const router = express.Router();
router.use(authServices.protect);

router
  .route("/")
  .post(
    uploadMissingImage,
    resizeMissingImage,
    authServices.addUserIdToBody,
    createMissingValidator,
    creatMissing,
  
  )
  .get(getAllMissing);
router
  .route("/:id")
  .put(
    uploadMissingImage,
    resizeMissingImage,
    authServices.addUserIdToBody,
    updateMissingValidator,
    updateMissing
  )
  .get(getMissingValidator, getOneMissing)
  .delete(deleteMissingValidator, deleteMissing);

module.exports = router;
