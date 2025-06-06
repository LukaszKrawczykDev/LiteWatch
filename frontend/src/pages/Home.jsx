// src/pages/Home.jsx
import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import MovieRow from "../components/MovieRow";

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const base = import.meta.env.VITE_API_URL;
            const [p, t, u] = await Promise.all([
                fetch(`${base}/api/movies/popular`).then((r) => r.json()),
                fetch(`${base}/api/movies/top_rated`).then((r) => r.json()),
                fetch(`${base}/api/movies/upcoming`).then((r) => r.json()),
            ]);
            setPopular(p.slice(0, 20));
            setTopRated(t.slice(0, 20));
            setUpcoming(u.slice(0, 20));
            setLoading(false);
        };
        fetchAll();
    }, []);

    if (loading) return <div className="p-6">Ładowanie filmów…</div>;

    return (
        <>
            <CategoryBar />

            <div className="space-y-12">
                <MovieRow title="Popularne filmy" movies={popular} />
                <MovieRow title="Top Rated" movies={topRated} />
                <MovieRow title="Nadchodzące" movies={upcoming} />
            </div>
        </>
    );
}