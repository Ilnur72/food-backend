const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors/index.js");

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: Get a food by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       '404':
 *         description: Food not found
 */
const showFood = async ({ id }) => {
  const existing = await db("foods").where({ id, is_deleted: false }).first();
  if (!existing) throw new NotFoundError("Food Not Found");
  return existing;
};

module.exports = showFood;
