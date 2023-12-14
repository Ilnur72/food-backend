const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postAddUserSchema,
  postLoginUserSchema,
  showUserSchema,
  patchUserSchema,
  patchMeSchema,
  deleteUserSchmea,
  getUsersSchema,
} = require("./_schemas");

const addUser = require("./add-user");
const loginUser = require("./login-user");
const listUsers = require("./list-users");
const showUser = require("./show-user");
const editUser = require("./edit-user");
const removeUser = require("./remove-user");
const { ForbiddenError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postAddUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postAddUserSchema);

    const result = await addUser(req.body);

    res.status(201).json({
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
const postLoginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postLoginUserSchema);
    const result = await loginUser(req.body);

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
const getUsers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getUsersSchema);

    const result = await listUsers(req.query);

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
const getShowUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showUserSchema);

    const result = await showUser({ id: req.params.id });

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
const patchUserMe = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchMeSchema);

    const result = await editUser({ id: req.user.id, ...req.body });

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
const patchUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchUserSchema);

    const result = await editUser({ id: req.params.id, ...req.body });

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
const deleteUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteUserSchmea);

    const result = await removeUser({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAddUser,
  postLoginUser,
  getUsers,
  getShowUser,
  patchUser,
  patchUserMe,
  deleteUser,
};
