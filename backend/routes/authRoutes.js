"use strict";

const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/admin/login", login);
router.post("/auth/login", login);
router.post("/login", login);

module.exports = router;
