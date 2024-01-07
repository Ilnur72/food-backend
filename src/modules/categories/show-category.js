const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors/index.js");

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a category by ID
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
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 */
const showCategory = async ({ id }) => {
  const existing = await db("categories")
    .where({ id, is_deleted: false })
    .first();
  if (!existing) throw new NotFoundError("Category Not Found");
  return existing;
};

module.exports = showCategory;
