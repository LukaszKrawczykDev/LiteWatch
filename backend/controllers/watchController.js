const Watch = require("../models/Watchlist");
const { tmdbFetch } = require("../utils/tmdb");

exports.addToWatch = async (req, res) => {
    try {
        const { movieId } = req.body;
        const info = await tmdbFetch(`/movie/${movieId}`);
        const item = await Watch.findOneAndUpdate(
            { userId: req.user.id, movieId },
            {
                title: info.title,
                poster_path: info.poster_path,
            },
            { upsert: true, new: true }
        );

        res.status(201).json(item);
    } catch (e) {
        res.status(500).json({ message: "Watch error", error: e.message });
    }
};

exports.removeWatch = async (req, res) => {
    await Watch.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ ok: true });
};

exports.myWatchlist = async (req, res) => {
    const list = await Watch.find({ userId: req.user.id });
    res.json(list);
};