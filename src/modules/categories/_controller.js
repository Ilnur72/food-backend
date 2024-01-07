const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postAddCategorySchema,
  showCategorySchema,
  patchCategorySchema,
  deleteCategorySchmea,
} = require("./_schema");

const addCategory = require("./add-category");
const showCategory = require("./show-category");
const listCategory = require("./list-category");
const editCategory = require("./edit-category");
const removeCategory = require("./remove-category");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddCategory = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postAddCategorySchema);
    const result = await addCategory(req.body);
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
const getListCategories = async (req, res, next) => {
  try {
    const result = await listCategory();
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
const getShowCategory = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showCategorySchema);

    const result = await showCategory({ id: req.params.id });

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
const patchCategory = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchCategorySchema);

    const result = await editCategory({ id: req.params.id, ...req.body });

    res.status(202).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteCategory = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteCategorySchmea);
    const result = await removeCategory({ id: req.params.id });
    res.status(200).json({ dat: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddCategory,
  getListCategories,
  getShowCategory,
  patchCategory,
  deleteCategory
};
