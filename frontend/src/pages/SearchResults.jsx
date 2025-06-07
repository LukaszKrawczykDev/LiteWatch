import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Star } from "lucide-react";
import CategoryBar from "../components/CategoryBar.jsx";

export default function SearchResults() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const q = params.get("q");
    const genreId = params.get("genre");
    const genreName = params.get("name");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const base = import.meta.env.VITE_API_URL;
        const url  = genreId
            ? `${base}/api/movies/by_genre/${genreId}`
            : `${base}/api/movies/search?query=${encodeURIComponent(q)}`;

        fetch(url)
            .then(r => r.json())
            .then(d => {
                setMovies(Array.isArray(d) ? d : []);  // bezpieczeństwo
                setLoading(false);
            });
    }, [q, genreId]);

    if (!loading && movies.length === 0)
        return <p className="p-6">Brak wyników.</p>;
    if (loading) return <div className="p-6">Ładowanie wyników…</div>;

    return (
        <>
        <CategoryBar />
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">
                {genreName ? `Filmy w kategorii: ${genreName}` : `Wyniki dla: “${q}”`}
            </h1>

            {movies.length === 0 && <p>Brak wyników.</p>}

            {movies.map((m) => (
                <Link
                    key={m.id}
                    className="flex flex-col sm:flex-row gap-4 border-b border-zinc-200 dark:border-zinc-700 pb-4"
                    to={`/movie/${m.id}`}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w185${m.poster_path}`}
                        alt={m.title}
                        className="w-36 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-1">
                        <h2 className="text-lg font-semibold">{m.title}</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            ⭐ {(m.vote_average ?? 0).toFixed(1)}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
}