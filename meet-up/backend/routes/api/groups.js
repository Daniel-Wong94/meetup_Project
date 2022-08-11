const express = require("express");
const router = express.Router();
const { Group, User } = require("../../db/models");
const { validateGroup } = require("../../utils/validation.js");

// GET /api/groups
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll();

  res.json({ Groups: groups });
});

// POST /api/groups
router.post("/", validateGroup, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;

  const group = await Group.create({ name, about, type, private, city, state });

  res.json(group);
});

module.exports = router;
