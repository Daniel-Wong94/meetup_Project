const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));

// parse incoming cookies and json bodies
app.use(cookieParser());
app.use(express.json());

// Security Middlewares
if (!isProduction) app.use(cors());

// deny no-cors requests from cross origins
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

app.use(routes);

module.exports = app;
