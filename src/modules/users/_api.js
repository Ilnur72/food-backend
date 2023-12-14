const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postLoginUser,
  postAddUser,
  getUsers,
  getShowUser,
  patchUser,
  patchUserMe,
  deleteUser,
} = require("./_controllers");

const router = express.Router();

router.post("/login", postLoginUser);
router.post("/users", isLoggedIn, postAddUser);
router.get("/users", isLoggedIn, getUsers);
router.get("/users/:id", isLoggedIn, getShowUser);
router.patch("/users/me", isLoggedIn, patchUserMe);
router.patch("/users/:id", isLoggedIn, patchUser);
router.delete("/users/:id", isLoggedIn, deleteUser);

module.exports = router;
