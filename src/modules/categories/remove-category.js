const db = require("../../db/index.js");

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '404':
 *         description: Category not found
 */
const removeCategory = async ({ id }) => {
  const existing = await db("categories")
    .where({ id, is_deleted: false })
    .first();
  if (!existing) throw new NotFoundError("Category Not Found");
  return await db("categories").where({ id }).delete().returning("*")[0];
};

module.exports = removeCategory