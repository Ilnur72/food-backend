const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors");
const {
  applySearch,
  applySorting,
  applyFilters,
} = require("../../shared/middleware/query-functions.js");

/**
 * @swagger
 * /food:
 *   get:
 *     summary: Gets a list of food.
 *     description: Returns a list of food.
 *     tags: [Food]
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Search query for food name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: filters
 *         description: JSON object for additional filters .
 *         schema:
 *           type: object
 *       - in: query
 *         name: sort
 *         description: JSON object for sorting .
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: A list of food.
 *       404:
 *         description: Food Not Found.
 */
const listFood = async ({
  q,
  filters,
  sort,
  // pagination = { offset: 1, limit: 9 },
}) => {
  let existing = db("foods").where({ is_deleted: false }).select("*");
  if (!existing) throw new NotFoundError("Food Not Found");

  const total = existing.clone().count().groupBy("id");

  //? paginaton bo'lishi hozircha noma'lum
  // existing
  //   .limit(pagination.limit)
  //   .offset((pagination.offset - 1) * pagination.limit);
  console.log(sort);
  applySearch(existing, q, "name");
  applyFilters(existing, filters);
  applySorting(existing, sort);

  const data = await existing;

  return {
    list: data,
    total: (await total).length,
    // limit: pagination.limit,
    // offset: pagination.offset,
  };
};

module.exports = listFood;
