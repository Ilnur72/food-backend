const Joi = require("joi");

exports.postAddUserSchema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
    is_deleted: Joi.boolean(),
  }),
};

exports.postLoginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
  }),
};

// ?q=a&page[offset]=0&page[limit]=10
exports.getUsersSchema = {
  query: Joi.object({
    q: Joi.string(),
    page: Joi.object({
      offset: Joi.number().integer(),
      limit: Joi.number().integer().when("offset", {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
    }),
    sort: Joi.object({
      by: Joi.string().valid("username"),
      order: Joi.string().valid("asc", "desc"),
    }),
    filters: Joi.object({
      is_deleted: Joi.boolean(),
    }),
  }),
};

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
