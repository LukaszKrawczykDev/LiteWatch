const express = require("express");
const { createReview, getMovieReviews, deleteReview, getMyReviews } = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createReview);
router.get("/me", auth, getMyReviews);
router.get("/:movieId", getMovieReviews);
router.delete("/:movieId", auth, deleteReview);

module.exports = router;