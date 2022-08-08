const router = require("express").Router();

// Testing Router
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
