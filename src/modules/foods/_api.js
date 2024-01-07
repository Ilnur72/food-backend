const express = require('express');
const { postAddFood, getListFood, getShowFood, patchFood, deleteFood } = require('./_controller');

const router = express.Router();

router.post("/food", postAddFood);
router.get("/food", getListFood);
router.get("/food/:id", getShowFood);
router.patch("/food/:id", patchFood);
router.delete("/food/:id", deleteFood);

module.exports = router;
