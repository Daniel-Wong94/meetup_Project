const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");
const routes = require("./routes");

const {
  resourceNotFoundHandler,
  sequelizeErrorsHandler,
  errorFormatter,
  isProduction,
} = require("./middlewares/error-handlers.js");

const app = express();

app.use(morgan("dev"));

// parse incoming cookies and json bodies
app.use(cookieParser());
app.use(express.json());

// Security Middlewares
if (!isProduction) app.use(cors());

// Deny no-cors requests from cross origins
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

/*
CSRF: _csrf cookie set to HTTP only and creates a method on all requests (req.csrfToken())
cookie: store the token secret in a cookie instead of session
  Options:
  secure: when in production, cookies to be used with HTTPS only
  sameSite: set to lax
  httpOnly: cookie is only accessible by web server
*/
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Connect all routes
app.use(routes);

//Error handlers
app.use(resourceNotFoundHandler, sequelizeErrorsHandler, errorFormatter);

module.exports = app;
