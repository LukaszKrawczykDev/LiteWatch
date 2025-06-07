const express = require("express");
const { getGenres } = require("../controllers/genreController");
const router = express.Router();

router.get("/", getGenres);

module.exports = router;