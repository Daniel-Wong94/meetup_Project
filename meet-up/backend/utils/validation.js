const { validationResult, check, query } = require("express-validator");
const { Venue, Membership, User } = require("../db/models");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = {};

    validationErrors.array().forEach((err) => (errors[err.param] = err.msg));

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
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
    .isEmail()
    .notEmpty()
    .withMessage("Invalid Email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("firstName")
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must have 2-20 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("lastName")
    .isLength({ min: 2, max: 25 })
    .withMessage("Last Name must have 2-25 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 - 20 characters"),
  handleValidationErrors,
];

const validateGroup = [
  check("name")
    .isLength({ min: 10, max: 60 })
    .withMessage("Name must be 10 - 60 characters"),
  check("about")
    .isLength({ min: 50, max: undefined })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private").isBoolean().withMessage("Private must be a boolean"),
  check("city").notEmpty().withMessage("City is required"),
  check("city")
    .isLength({ min: 3 })
    .withMessage("City should be at least 3 characters"),
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

const validateVenue = [
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  handleValidationErrors,
];

const validateEvent = [
  // check("venueId")
  //   .custom((id) => Venue.isValidVenue(id))
  //   .withMessage("Venue does not exist"),
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  check("type")
    .isIn(["Online", "In person"])
    .withMessage("Type must be Online or In person"),
  check("description")
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters"),
  check("capacity")
    .isInt()
    .not()
    .isString()
    .withMessage("Capacity must be an integer"),
  check("price")
    .isCurrency({
      digits_after_decimal: [1, 2],
      allow_negatives: false,
    })
    .withMessage("Price is invalid"),
  check("description").notEmpty().withMessage("Description is required"),
  check("startDate").isAfter().withMessage("Start date must be in the future"),
  check("endDate")
    .custom((endDate, { req }) => {
      if (new Date(endDate) < new Date(req.body.startDate)) {
        throw new Error();
      }
      return true;
    })
    .withMessage("End date is less than start date"),
  handleValidationErrors,
];

const validateUpdateMembership = [
  check("memberId")
    .isInt()
    .notEmpty()
    .custom(
      async (id, { req }) =>
        await Membership.isValidMembership(id, req.params.groupId)
    )
    .withMessage("User couldn't be found"),
  check("status")
    .isIn(["member", "co-host"])
    .withMessage("Cannot change a membership status to 'pending'"),
  handleValidationErrors,
];

const validateEventQuery = [
  query("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  query("name")
    .optional()
    .isString()
    .not()
    .isInt()
    .withMessage("Name must be a string"),
  query("type")
    .optional()
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  query("startDate")
    .optional()
    .custom((value) => {
      const date = new Date(value);

      if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("invalid date");
      } else {
        return true;
      }
    })
    .withMessage("Start date must be a valid datetime"),
  handleValidationErrors,
];

const validateUserUpdate = [
  check("newEmail").isEmail().withMessage("Invalid email"),
  check("currentPassword").notEmpty().withMessage("Password required"),
  check("newPassword")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 - 20 characters"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateGroup,
  validateUpdateGroup,
  validateVenue,
  validateEvent,
  validateUpdateMembership,
  validateEventQuery,
  validateUserUpdate,
};
