const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors");

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '202':
 *         description: Category updated successfully
 *       '404':
 *         description: Category not found
 */
const editCategory = async ({ id, ...changes }) => {
  const existing = await db("categories")
    .where({ id, is_deleted: false })
    .first();

  if (!existing) throw new NotFoundError("Category Not Found");

  return (
    await db("categories").where({ id }).update(changes).returning("*")
  )[0];
};

module.exports = editCategory;
