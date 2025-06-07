import {useEffect, useRef, useState} from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MovieRow({ title, movies }) {
    const scrollRef = useRef(null);
    const nav = useNavigate();
    const { user, setWatchCount } = useAuth();
    const [watchIds, setWatchIds] = useState(new Set());
    useEffect(() => {
        if (!user) return;
        fetch(`${import.meta.env.VITE_API_URL}/api/watchlist/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
            .then(r => r.json())
            .then(arr => setWatchIds(new Set(arr.map(w => w.movieId))));
    }, [user]);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardW = el.firstChild?.offsetWidth || 170;
        el.scrollBy({ left: dir * cardW * 4, behavior: "smooth" });
    };

    return (
        <section className="mt-6 px-4 space-y-4 relative overflow-visible">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <button
                onClick={() => scroll(-1)}
                className="absolute left-0 top-1/2 hidden md:flex -translate-y-1/2 w-10 h-24 items-center justify-center
                    bg-black/40 hover:bg-black/60 text-white rounded-r-lg z-20"
            >
                ‹
            </button>
            <button
                onClick={() => scroll(1)}
                className="absolute right-0 top-1/2 hidden md:flex -translate-y-1/2 w-10 h-24 items-center justify-center
                    bg-black/40 hover:bg-black/60 text-white rounded-l-lg z-20"
            >
                ›
            </button>
            <div
                ref={scrollRef}
                className="relative flex gap-4 overflow-x-auto pb-3 scrollbar-none group"
            >
                {movies.map((m) => (
                    <Link key={m.id} to={`/movie/${m.id}`} className="group relative shrink-0 w-40 md:w-48">
                    <div
                        key={m.id}
                        className="
                            relative shrink-0 w-40 md:w-48 h-60 md:h-72
                            transition-transform duration-300 ease-out
                            group-hover:scale-90
                            hover:!scale-100
                        "
                    >
                        <div className="relative w-full h-full cursor-pointer z-10">
                            <img
                                src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                                alt={m.title}
                                className="rounded-lg shadow-md w-full h-full object-cover"
                            />

                            <div
                                className="absolute inset-0 rounded-lg flex flex-col justify-between
                                    bg-gradient-to-t from-black/80 via-black/50 to-transparent
                                    opacity-0 hover:opacity-100 transition-opacity"
                            >
                                <div className="flex justify-start p-2">
                                    <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-sm text-white font-medium shadow-sm">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        {(m.vote_average ?? 0).toFixed(1)} (TMDB)
                                    </span>
                                </div>
                                {m.liteAvg && (
                                <div className="flex justify-start p-2">
                                    <span className="flex items-center gap-1 bg-blue-600 px-2 py-1 rounded text-sm text-white font-medium shadow-sm">
                                        {m.liteAvg} (LW)
                                    </span>
                                </div>
                                )}
                                <div>
                                    <p className="px-3 pt-2 pb-1 text-base font-semibold text-white line-clamp-2">
                                        {m.title}
                                    </p>

                                    <div className="flex items-center justify-between px-3 pb-3 text-sm text-white">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    nav(`/movie/${m.id}#rate`);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium shadow-md transition"
                                            >
                                                Oceń
                                            </button>
                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (!user) return alert("Zaloguj się");
                                                    const token = localStorage.getItem("jwt");
                                                    if (watchIds.has(m.id)) {
                                                        const existing = await fetch(`${import.meta.env.VITE_API_URL}/api/watchlist/me`, {
                                                            headers: { Authorization: `Bearer ${token}` }
                                                        }).then(r=>r.json()).then(arr=>arr.find(w=>w.movieId===m.id));
                                                        await fetch(`${import.meta.env.VITE_API_URL}/api/watchlist/${existing._id}`, {
                                                            method: "DELETE",
                                                            headers: { Authorization: `Bearer ${token}` }
                                                        });
                                                    } else {
                                                        await fetch(`${import.meta.env.VITE_API_URL}/api/watchlist`, {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                Authorization: `Bearer ${token}`
                                                            },
                                                            body: JSON.stringify({ movieId: m.id })
                                                        });
                                                    }
                                                    const arr = await fetch(`${import.meta.env.VITE_API_URL}/api/watchlist/me`, {
                                                        headers: { Authorization: `Bearer ${token}` }
                                                    }).then(r => r.json());
                                                    setWatchCount(arr.length);
                                                    setWatchIds(new Set(arr.map(w => w.movieId)));
                                                }}
                                                className={`px-3 py-1.5 rounded-md font-medium shadow-md transition
                                                ${watchIds.has(m.id)
                                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                                    : "bg-white/90 hover:bg-white text-black"
                                                }`}
                                            >
                                                {watchIds.has(m.id) ? "W liście ✓" : "Do obejrzenia"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}