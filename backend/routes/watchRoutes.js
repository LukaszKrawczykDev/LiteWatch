const express = require("express");
const { addToWatch, removeWatch, myWatchlist } = require("../controllers/watchController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, addToWatch);
router.delete("/:id", auth, removeWatch);
router.get("/me", auth, myWatchlist);

module.exports = router;