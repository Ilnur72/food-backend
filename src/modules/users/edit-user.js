const { hash } = require("bcryptjs");
const db = require("../../db/index.js");
const { NotFoundError } = require("../../shared/errors/index.js");

const editUser = async ({ id, ...changes }) => {
  const existing = await db("users").where({ id, is_deleted: false }).first();
  const hashedPassword = {};

  if (!existing) throw new NotFoundError("User Not Found");

  if (changes.password)
    hashedPassword.password = await hash(changes.password, 10);

  return (
    await db("users")
      .where({ id })
      .update({ ...changes, ...hashedPassword, updated_at: new Date() })
      .returning("*")
  )[0];
};

module.exports = editUser;
