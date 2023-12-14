const db = require("../../db/index.js");

const listUsers = async ({
  q,
  filters,
  sort,
  pagination = { offset: 1, limit: 5 },
}) => {
  let existing = db("users").select("*");
  const total = existing.clone().count().groupBy("id");

  existing
    .limit(pagination.limit)
    .offset((pagination.offset - 1) * pagination.limit);

  let filter = {};

  if (q) existing.where("first_name", "ilike", `%${q}%`);
  if (filters) filter = filters;
  if (sort) existing.orderBy(sort.by, sort.order);

  existing.orWhere(filter);

  const data = await existing;

  return {
    list: data,
    limit: pagination.limit,
    offset: pagination.offset,
    total: (await total).length,
  };
};

module.exports = listUsers;
