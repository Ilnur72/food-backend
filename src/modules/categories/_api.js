const express = require("express");
const {
  postAddCategory,
  patchCategory,
  deleteCategory,
  getListCategories,
  getShowCategory,
} = require("./_controller");

const router = express.Router();


router.post("/category", postAddCategory);
router.get("/category", getListCategories);
router.get("/category/:id", getShowCategory);
router.patch("/category/:id", patchCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
