// controllers/movieController.js
const { tmdbFetch } = require("../utils/tmdb");

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