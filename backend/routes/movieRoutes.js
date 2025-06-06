// routes/movieRoutes.js
const express = require("express");
const {
    getPopular,
    getTopRated,
    getUpcoming,
    searchMovies,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/popular", getPopular);
router.get("/top_rated", getTopRated);
router.get("/upcoming", getUpcoming);
router.get("/search", searchMovies);

module.exports = router;