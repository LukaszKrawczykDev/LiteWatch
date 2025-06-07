import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";

const API      = import.meta.env.VITE_API_URL;
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

export default function Library() {
    const { user } = useAuth();
    const [list, setList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        fetch(`${API}/api/reviews/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => (r.ok ? r.json() : []))
            .then(async (arr) => {
                const full = await Promise.all(
                    arr.map(async (rev) => {
                        if (rev.title && rev.poster_path) return rev; // mamy dane
                        const info = await fetch(
                            `https://api.themoviedb.org/3/movie/${rev.movieId}?api_key=${TMDB_KEY}&language=pl-PL`
                        ).then((r) => r.json());
                        return { ...rev, title: info.title, poster_path: info.poster_path };
                    })
                );
                setList(full);
            });
    }, []);

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">Moja biblioteka</h1>

            {list.length === 0 && <p>Nie oceniłeś jeszcze żadnego filmu.</p>}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((rev) => (
                    <Link
                        key={rev._id}
                        to={`/movie/${rev.movieId}`}
                        className="group flex flex-col rounded-xl shadow hover:shadow-lg transition
                       bg-white dark:bg-zinc-800 overflow-hidden"
                    >
                        {rev.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${rev.poster_path}`}
                                alt={rev.title}
                                className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform"
                            />
                        )}

                        <div className="p-4 flex-1 flex flex-col">
                            <p className="font-semibold line-clamp-2">{rev.title}</p>

                            <div className="mt-1">
                                <StarRating value={rev.rating} readOnly />
                            </div>

                            {rev.text && (
                                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                                    {rev.text}
                                </p>
                            )}

                            <p className="mt-auto pt-2 text-xs text-zinc-500">
                                {format(new Date(rev.updatedAt), "d MMM yyyy", { locale: pl })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}