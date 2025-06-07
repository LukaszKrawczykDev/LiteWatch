const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema(
    {
        userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        movieId:     { type: Number, required: true }, // TMDB id
        title:       String,
        poster_path: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchSchema);