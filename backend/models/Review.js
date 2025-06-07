const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        movieId:  { type: Number, required: true }, //TMDB
        rating:   { type: Number, min: 0, max: 10, required: true },
        text:     { type: String, maxlength: 2000 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);