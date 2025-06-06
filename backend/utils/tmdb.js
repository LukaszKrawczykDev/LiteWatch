// backend/utils/tmdb.js
const axios = require("axios");
// prosty cache w pamięci: { key: { data, expires } }
const cache = {};
const TTL = 10 * 60 * 1000; // 10 min

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: process.env.TMDB_API_KEY, language: "pl-PL" },
});

async function tmdbFetch(endpoint, params = {}) {
    const key = `${endpoint}_${JSON.stringify(params)}`;
    const now = Date.now();

    if (cache[key] && cache[key].expires > now) return cache[key].data;

    const { data } = await tmdb.get(endpoint, { params });
    cache[key] = { data, expires: now + TTL };
    return data;
}

module.exports = { tmdbFetch };