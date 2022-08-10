const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

// Sets the JWT cookie: logins and signups
const setTokenCookie = (res, user) => {
  const token = jwt.sign({ data: user.toSafeObject() }, secret, {
    expiresIn: parseInt(expiresIn),
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// Middleware: checks if there is a user logged in
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next();

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id);
    } catch (error) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// Middleware: requires authentication BEFORE accessing route ()
const requireAuth = (req, res, next) => {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.title = "Authentication required";
  err.errors = ["Authentication required"];
  err.status = 401;
  return next(err);
};

/*
in order: [restoreUser, requireAuth]
- restoreUser: if valid JWT exists, session user instance will be loaded into req.user
- requireAuth: if req.user exists, go to next middleware, else throw error
*/

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
};
