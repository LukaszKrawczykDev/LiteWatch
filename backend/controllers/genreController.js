const { tmdbFetch } = require("../utils/tmdb");

exports.getGenres = async (_, res) => {
    try {
        const d = await tmdbFetch("/genre/movie/list");
        res.json(d.genres); // [{ id, name }, ...]
    } catch (e) {
        res.status(500).json({ message: "TMDB genres error", error: e.message });
    }
};