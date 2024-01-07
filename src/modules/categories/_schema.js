const Joi = require("joi");
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *           required: true
 *         is_deleted:
 *           type: boolean
 *           description: Category is deleted
 *           required: true
 */

exports.postAddCategorySchema = {
  body: Joi.object({
    name: Joi.string().required(),
    is_deleted: Joi.boolean(),
  }),
};

exports.patchCategorySchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

exports.showCategorySchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.deleteCategorySchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
