import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";

export default function Watchlist() {
    const { user } = useAuth();
    const [list, setList] = useState([]);
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        fetch(`${API}/api/watchlist/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setList);
    }, []);

    const handleRemove = async (_id) => {
        const token = localStorage.getItem("jwt");
        await fetch(`${API}/api/watchlist/${_id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setList((prev) => prev.filter((w) => w._id !== _id));
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">Moja watchlista</h1>

            {list.length === 0 && <p>Lista jest pusta.</p>}

            {list.map((w) => (
                <div
                    key={w._id}
                    className="flex gap-4 items-center border-b border-zinc-200 dark:border-zinc-700 py-3"
                >
                    <Link to={`/movie/${w.movieId}`} className="flex-1 flex items-center gap-4">
                        {w.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${w.poster_path}`}
                                alt={w.title}
                                className="w-24 rounded-lg object-cover"
                            />
                        )}
                        <div>
                            <p className="font-medium">{w.title || `Film #${w.movieId}`}</p>
                            <p className="text-xs text-zinc-500">
                                dodano&nbsp;
                                {format(new Date(w.createdAt), "d MMM yyyy", { locale: pl })}
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={() => handleRemove(w._id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Usuń
                    </button>
                </div>
            ))}
        </div>
    );
}