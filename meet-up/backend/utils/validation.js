const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = validationErrors.array().map((error) => `${error.msg}`);
    let errors = {};

    validationErrors.array().forEach((err) => (errors[err.param] = err.msg));

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    // err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isEmail()
    .withMessage("Invalid Email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

const validateGroup = [
  check("name")
    .isLength({ min: 0, max: 60 })
    .withMessage("Name must be 60 characters or less"),
  check("about")
    .isLength({ min: 50, max: undefined })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private").isBoolean().withMessage("Private must be a boolean"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  handleValidationErrors,
];

const validateUpdateGroup = [
  check("name")
    .isLength({ min: 0, max: 60 })
    .withMessage("Name must be 60 characters or less"),
  check("about")
    .isLength({ min: 50, max: undefined })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private").isBoolean().withMessage("Private must be a boolean"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateGroup,
};
