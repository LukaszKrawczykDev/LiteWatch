const Review = require("../models/Review");

exports.createReview = async (req, res) => {

    const { movieId, rating, text } = req.body;

    const rev = await Review.findOneAndUpdate(
        { userId: req.user.id, movieId },
        { rating, text },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            setOnInsert: { userId: req.user.id, movieId },
        }
    ).populate("userId", "username");

    res.status(201).json(rev);
};

exports.getMovieReviews = async (req, res) => {
    const reviews = await Review.find({ movieId: req.params.movieId })
        .populate("userId", "username");
    res.json(reviews);
};

exports.deleteReview = async (req, res) => {
    await Review.deleteOne({ userId: req.user.id, movieId: req.params.movieId });
    res.json({ ok: true });
};

exports.getMyReviews = async (req, res) => {
    const list = await Review.find({ userId: req.user.id })
        .sort({ updatedAt: -1 });
    res.json(list);
};