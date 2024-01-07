const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

/**
 * @swagger
 * /food/{id}:
 *   delete:
 *     summary: Delete a food by ID
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
 *         description: Food deleted successfully
 *       '404':
 *         description: Food not found
 */
const removeFood = async ({ id }) => {
  const existing = await db("foods").where({ id, is_deleted: false }).first();
  if (!existing) throw new NotFoundError("Food Not Found");
  return await db("foods").where({ id }).delete().returning("*")[0];
};

module.exports = removeFood;
