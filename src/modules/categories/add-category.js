const db = require("../../db/index.js");

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       description: Category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *
 */
const addCategory = async (payload) => {
  const result = await db("categories").insert(payload).returning("*");
  return result[0];
};

module.exports = addCategory;
