const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postAddFoodSchema,
  getFoodSchema,
  showFoodSchema,
  patchFoodSchema,
  deleteFoodSchmea,
} = require("./_schema");
const addFood = require("./add-food");
const listFood = require("./list-food");
const showFood = require("./show-food");
const removeFood = require("./remove-food");
const editFood = require("./edit-food");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddFood = (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postAddFoodSchema);
    const result = addFood(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getListFood = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getFoodSchema);

    const result = await listFood(req.query);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getShowFood = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showFoodSchema);

    const result = await showFood({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchFood = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchFoodSchema);

    const result = await editFood({ id: req.params.id, ...req.body });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteFood = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteFoodSchmea);

    const result = await removeFood({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddFood,
  getListFood,
  getShowFood,
  patchFood,
  deleteFood,
};
