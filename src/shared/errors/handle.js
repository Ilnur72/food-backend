const express = require("express");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} = require(".");

/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
// module.exports = (err, _, res, next) => {
//   console.log(err);
//   let status = 500;

//   if (err instanceof BadRequestError) status = 400;
//   else if (err instanceof UnauthorizedError) status = 401;
//   else if (err instanceof ForbiddenError) status = 403;
//   else if (err instanceof NotFoundError) status = 404;

//   res.status(status).json({ error: err.message });
// };
module.exports = (err, _, res, next) => {
  console.log(err);
  let status = 500;

  const errorTypes = {
    BadRequestError: 400,
    UnauthorizedError: 401,
    ForbiddenError: 403,
    NotFoundError: 404,
  };

  const errorName = err.constructor.name;
  if (errorTypes[errorName]) status = errorTypes[errorName];

  res.status(status).json({ error: err.message });
};
