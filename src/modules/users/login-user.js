const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../shared/errors");
const config = require("../../shared/config");
const db = require("../../db");

const loginUser = async ({ username, password }) => {
  const existing = await db("users")
    .where({ username, is_deleted: false })
    .returning("*")
    .first();

  if (!existing) throw new UnauthorizedError("Incorrect username or password.");

  const match = await compare(password, existing.password);

  if (!match) throw new UnauthorizedError("Incorrect username or password.");

  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = loginUser;
