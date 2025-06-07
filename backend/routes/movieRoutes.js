const express = require("express");
const {
    getPopular,
    getTopRated,
    getUpcoming,
    searchMovies,
    getByGenre,
    getDetails,
    getSimilar,
    getTopLite,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/popular", getPopular);
router.get("/top_rated", getTopRated);
router.get("/upcoming", getUpcoming);
router.get("/search", searchMovies);
router.get("/by_genre/:id", getByGenre);
router.get("/top_lite",   getTopLite);
router.get("/:id", getDetails);
router.get("/:id/similar", getSimilar);
router.get("/:id", getDetails);

module.exports = router;