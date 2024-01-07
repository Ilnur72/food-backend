const Joi = require("joi");

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Food name
 *           required: true
 *         price:
 *           type: integer
 *           description: Food price
 *           required: true
 *         total_food;:
 *           type: integer
 *           description: Total food
 *           required: true
 *         total_sold:
 *           type: integer
 *           description: Food total sold
 *         images:
 *           type: string
 *           description: Food photo
 *           required: true
 *         is_deleted:
 *           type: boolean
 *           description: Food is deleted
 *           required: true
 */

exports.postAddFoodSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    total_food: Joi.number().required(),
    total_sold: Joi.string(),
    images: Joi.string().required(),
    is_deleted: Joi.boolean().required(),
  }),
};

exports.patchFoodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    total_food: Joi.number(),
    total_sold: Joi.string(),
    images: Joi.string(),
    is_deleted: Joi.boolean(),
  }),
};

// ?q=a&page[offset]=0&page[limit]=10
exports.getFoodSchema = {
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
      by: Joi.string().valid("price", "total_sold"),
      order: Joi.string().valid("asc", "desc"),
    }),
    filters: Joi.object({
      category_id: Joi.number(),
      is_deleted: Joi.boolean(),
    }),
  }),
};

exports.showFoodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.deleteFoodSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
