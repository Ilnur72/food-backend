const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

/**
 * @swagger
 * /food/{id}:
 *   put:
 *     summary: Update a food by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated food data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       '202':
 *         description: Food updated successfully
 *       '404':
 *         description: Food not found
 */
const editFood = async ({ id, ...changes }) => {
  const existing = await db("foods").where({ id, is_deleted: false }).first();

  if (!existing) throw new NotFoundError("Food Not Found");

  return (await db("foods").where(id).update(changes).returning("*"))[0];
};

module.exports = editFood;
