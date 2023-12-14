const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors/index.js");

const removeUser = async ({ id }) => {
  const existing = await db("users").where({ id, is_deleted: false }).first();

  if (!existing) throw new NotFoundError("User Not Found");

  return (await db("users").where({ id }).delete().returning("*"))[0];
};

module.exports = removeUser;
