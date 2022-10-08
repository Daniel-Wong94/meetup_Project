const express = require("express");
const router = express.Router();

const { googleMapsAPIKey } = require("../../config");

// Use POST in order to encrypt the API Key
router.post("/key", (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;
