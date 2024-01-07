const db = require("../../db");

/**
 * @swagger
 * /food:
 *   post:
 *     summary: Create a new food
 *     tags: [Food]
 *     requestBody:
 *       description: Food data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Food'
 *     responses:
 *       '201':
 *         description: Food created successfully
 *
 */
const addFood = async (payload) => {
  const result = await db("foods").insert(payload).returning("*");
  return result[0];
};
module.exports = addFood;
