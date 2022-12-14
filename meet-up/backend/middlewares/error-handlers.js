const { ValidationError } = require("sequelize");
const { environment } = require("../config");
const isProduction = environment === "production";

const resourceNotFoundHandler = (_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
};

// Catch sequelize errors
const sequelizeErrorsHandler = (err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    // console.log(err.errors);
    const error = {};
    err.errors.forEach((err) => (error[err.path] = err.message));
    // err.errors = err.errors.map((e) => e.message);
    err.status = 403;
    err.errors = error;
    err.title = "Validation error";
  }
  next(err);
};

// Error formatter
const errorFormatter = (err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    message: err.message,
    errors: err.errors,
    statusCode: err.status || 500,
  });
};

module.exports = {
  resourceNotFoundHandler,
  sequelizeErrorsHandler,
  errorFormatter,
  isProduction,
};
