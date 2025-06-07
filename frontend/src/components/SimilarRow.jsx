import { Link } from "react-router-dom";

export default function SimilarRow({ movies = [] }) {
    if (movies.length === 0) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Podobne filmy</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {movies.slice(0, 15).map((m) => (
                    <Link
                        key={m.id}
                        to={`/movie/${m.id}`}
                        className="shrink-0 w-28 hover:scale-105 transition-transform"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                            alt={m.title}
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <p className="mt-1 text-xs font-medium line-clamp-2">{m.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}