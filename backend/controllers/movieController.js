const { tmdbFetch } = require("../utils/tmdb");
const Review = require("../models/Review");

const map = (arr) =>
    arr.map((m) => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster_path,
        vote_average: m.vote_average,
    }));

exports.getPopular = async (_, res) => {
    try {
        const d = await tmdbFetch("/movie/popular", { page: 1 });
        res.json(map(d.results));
    } catch (e) {
        res.status(500).json({ message: "TMDB popular error", error: e.message });
    }
};

exports.getTopRated = async (_, res) => {
    try {
        const d = await tmdbFetch("/movie/top_rated", { page: 1 });
        res.json(map(d.results));
    } catch (e) {
        res.status(500).json({ message: "TMDB top_rated error", error: e.message });
    }
};

exports.getUpcoming = async (_, res) => {
    try {
        const d = await tmdbFetch("/movie/upcoming", { page: 1 });
        res.json(map(d.results));
    } catch (e) {
        res.status(500).json({ message: "TMDB upcoming error", error: e.message });
    }
};

exports.searchMovies = async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query required" });
    try {
        const d = await tmdbFetch("/search/movie", { query, page: 1, include_adult: false });
        res.json(map(d.results));
    } catch (e) {
        res.status(500).json({ message: "TMDB search error", error: e.message });
    }
};

exports.getByGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const d = await tmdbFetch("/discover/movie", {
            with_genres: id,
            sort_by: "popularity.desc",
            page: 1,
        });
        const movies = d.results.map((m) => ({
            id: m.id,
            title: m.title,
            poster_path: m.poster_path,
            vote_average: m.vote_average,
        }));
        res.json(movies);
    } catch (e) {
        res
            .status(500)
            .json({ message: "TMDB genre error", error: e.message });
    }
};
exports.getDetails = async (req, res) => {
    try {
        const data = await tmdbFetch(`/movie/${req.params.id}`, { append_to_response: "credits,videos" });
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "TMDB detail error", error: e.message });
    }
};

exports.getSimilar = async (req, res) => {
    try {
        const d = await tmdbFetch(`/movie/${req.params.id}/similar`, { page: 1 });
        const sims = d.results.map((m) => ({
            id: m.id,
            title: m.title,
            poster_path: m.poster_path,
            vote_average: m.vote_average,
        }));
        res.json(sims);
    } catch (e) {
        res.status(500).json({ message: "TMDB similar error", error: e.message });
    }
};

exports.getTopLite = async (_, res) => {
    try {
        const top = await Review.aggregate([
            { $group: { _id: "$movieId", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
            { $match: { count: { $gte: 2 } } },
            { $sort: { avg: -1 } },
            { $limit: 20 },
        ]);

        const full = await Promise.all(
            top.map(async (t) => {
                const info = await tmdbFetch(`/movie/${t._id}`);
                return {
                    ...info,
                    liteAvg:   t.avg.toFixed(2),
                    liteVotes: t.count,
                };
            })
        );

        res.json(full);
    } catch (e) {
        console.error("top_lite error:", e.message);
        res.status(500).json({ message: "Lite top error", error: e.message });
    }
};