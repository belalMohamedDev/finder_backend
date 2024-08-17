const express = require("express");
const {
  creatFind,
  deleteFind,
  getAllFind,
  getOneFind,
  resizeFindImage,
  updateFind,
  uploadFindImage,
} = require("../services/findService");
const authServices = require("../services/authServiece");

const {
  createFindValidator,
  deleteFindValidator,
  getFindValidator,
  updateFindValidator,
} = require("../utils/validators/findValidator");

const router = express.Router();

router.use(authServices.protect);

router
  .route("/")
  .post(
    uploadFindImage,
    resizeFindImage,
    authServices.addUserIdToBody,
    createFindValidator,
    creatFind
  )
  .get(getAllFind);
router
  .route("/:id")
  .put(
    uploadFindImage,
    resizeFindImage,
    authServices.addUserIdToBody,
    updateFindValidator,
    updateFind
  )
  .get(getFindValidator, getOneFind)
  .delete(deleteFindValidator, deleteFind);

module.exports = router;
