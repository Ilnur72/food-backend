const db = require("../../db/index.js");
const { hash } = require("bcryptjs");

const addUser = async (payload) => {
  const hashedPassword = await hash(payload.password, 10);
  const result = await db("users")
    .insert({ ...payload, password: hashedPassword })
    .returning("*");

  return result[0];
};

module.exports = addUser;
