import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";
import { Trash2 } from "lucide-react";
import {clsx} from "clsx";
import ActorCarousel from "../components/ActorCarousel";
import Trailer       from "../components/Trailer";
import { format }    from "date-fns";
import { pl }        from "date-fns/locale";
import SimilarRow     from "../components/SimilarRow";


export default function MoviePage() {
    const { id }   = useParams();
    const { user, setWatchCount } = useAuth();
    const API      = import.meta.env.VITE_API_URL;

    const [details, setDetails]   = useState(null);
    const [reviews, setReviews]   = useState([]);
    const [myReview, setMyReview] = useState({ rating: 0, text: "" });
    const [inWatch, setInWatch]   = useState(false);
    const [loading, setLoading]   = useState(true);
    const avg =
        reviews.length > 0
            ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
            : null;
    const isMine = (rev, uid) =>
        rev.userId?._id === uid || rev.userId === uid;
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            const [d, r, w, s] = await Promise.all([
                fetch(`${API}/api/movies/${id}`).then((r) => r.json()),
                fetch(`${API}/api/reviews/${id}`).then((r) => r.json()),
                user
                    ? fetch(`${API}/api/watchlist/me`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }).then((r) => r.json())
                    : [],
                fetch(`${API}/api/movies/${id}/similar`).then((r) => r.json()),
            ]);
            setSimilar(s);
            setDetails(d);
            setReviews(r);
            if (user) {
                const mine = r.find((rev) => isMine(rev, user.id));
                if (mine) setMyReview({ rating: mine.rating, text: mine.text, _id: mine._id });
            }
            if (user) {
                const mine = r.find(
                    (rev) =>
                        rev.userId === user.id ||
                        rev.userId?._id === user.id
                );
                if (mine) setMyReview({ rating: mine.rating, text: mine.text, _id: mine._id });
                const watchItem = w.find((wt) => wt.movieId === +id);
                if (watchItem) setInWatch(watchItem);
            }
            setLoading(false);
        };
        fetchAll();
    }, [id, user]);

    const handleWatchToggle = async () => {
        if (!user) return alert("Zaloguj się, aby korzystać z watchlisty");
        const token = localStorage.getItem("jwt");
        if (inWatch) {
            await fetch(`${API}/api/watchlist/${inWatch._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setWatchCount((c) => c - 1);
            setInWatch(false);
        } else {
            const res = await fetch(`${API}/api/watchlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ movieId: id }),
            });
            setWatchCount((c) => c + 1);
            const json = await res.json();
            setInWatch(json);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Zaloguj się, aby ocenić");
        const token = localStorage.getItem("jwt");
        const res = await fetch(`${API}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ movieId: id, ...myReview }),
        });
        const json = await res.json();
        if (res.ok) alert("Zapisano recenzję");
        if (res.ok) {
            setMyReview({ rating: json.rating, text: json.text, _id: json._id });
            setReviews((prev) => {
                const withoutMine = prev.filter((rv) => !isMine(rv, user.id));
                return [json, ...withoutMine];
            });
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("jwt");
        await fetch(`${API}/api/reviews/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setMyReview({ rating: 0, text: "" });
        setReviews((prev) => prev.filter((rv) => !isMine(rv, user.id)));
    };

    if (loading) return <div className="p-6">Ładowanie filmu…</div>;
    if (!details) return <div className="p-6">Nie znaleziono filmu.</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
                    alt={details.title}
                    className="w-56 rounded-lg shadow"
                />
                <div className="flex-1 space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-4">
                        {details.title}
                        <span className="text-base font-medium bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded">
                            ⭐ {details.vote_average.toFixed(1)} TMDB
                        </span>
                    </h1>
                    <p className="text-sm text-zinc-500 flex flex-wrap gap-2">
                        {details.release_date} • {details.runtime} min
                        {details.genres.map((g) => (
                            <span key={g.id} className="bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded text-xs">
                              {g.name}
                            </span>
                        ))}
                    </p>
                    <p>{details.overview}</p>
                    {(details.budget || details.revenue) && (
                        <table className="mt-2 text-sm">
                            <tbody>
                            {details.budget > 0 && (
                                <tr>
                                    <td className="pr-2 font-medium">Budżet:</td>
                                    <td>${details.budget.toLocaleString()}</td>
                                </tr>
                            )}
                            {details.revenue > 0 && (
                                <tr>
                                    <td className="pr-2 font-medium">Przychód:</td>
                                    <td>${details.revenue.toLocaleString()}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}


                    <button
                        onClick={handleWatchToggle}
                        className={`mt-2 px-4 py-2 rounded ${
                            inWatch ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white`}
                    >
                        {inWatch ? "Usuń z listy" : "Do obejrzenia"}
                    </button>
                </div>
            </div>
            {details.credits?.cast?.length > 0 && (
                <ActorCarousel cast={details.credits.cast} />
            )}
            {details.videos?.results?.length > 0 && (
                <Trailer videos={details.videos.results} />
            )}
            <SimilarRow movies={similar} />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Twoja ocena</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-2">
                    <StarRating
                        value={myReview.rating}
                        onChange={(v) => setMyReview((s) => ({ ...s, rating: v }))}
                    />


                    {myReview.rating > 0 && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4" /> Usuń ocenę
                        </button>
                    )}

                    <textarea
                        value={myReview.text}
                        onChange={(e) => setMyReview((s) => ({ ...s, text: e.target.value }))}
                        placeholder="Napisz recenzję (opcjonalnie)…"
                        className="w-full min-h-[80px] p-2 border rounded bg-zinc-100 dark:bg-zinc-800"
                    />
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                        Zapisz
                    </button>
                </form>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">
                    Recenzje innych {avg && <span className="text-base font-normal">({avg}⭐ średnia)</span>}
                </h2>

                {reviews.length === 0 && <p>Jeszcze nikt nie ocenił.</p>}

                {reviews.map((rev) => {
                    const mine = isMine(rev, user?.id);
                    return (
                        <div
                            key={rev._id}
                            className={clsx(
                                "relative border-b border-zinc-200 dark:border-zinc-700 py-3 pr-24",
                                mine && "bg-blue-50 dark:bg-zinc-800/50"
                            )}
                        >
                            <span className="absolute top-3 right-3 text-xs text-zinc-500">
                                {format(new Date(rev.createdAt), "d MMM yyyy", { locale: pl })}
                              </span>

                            <p className="text-sm font-medium">
                                {mine ? "Ty" : rev.userId?.username}
                            </p>
                            <StarRating value={rev.rating} readOnly />
                            {rev.text && <p className="mt-1 whitespace-pre-wrap">{rev.text}</p>}
                        </div>
                    );
                })}
            </section>
        </div>
    );
}