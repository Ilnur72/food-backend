const db = require("../../db/index.js");
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Gets a list of category.
 *     description: Returns a list of category.
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of category.
 *       404:
 *         description: Category Not Found.
 */
const listCategory = async () => {
  const existing = await db("categories").where({ is_deleted: false }).select();
  if (!existing) throw new Error("Category Not Found");
  return existing;
};

module.exports = listCategory;
