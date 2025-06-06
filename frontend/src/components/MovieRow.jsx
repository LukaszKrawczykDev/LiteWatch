// src/components/MovieRow.jsx
import { useRef } from "react";
import { Star } from "lucide-react";

export default function MovieRow({ title, movies }) {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardW = el.firstChild?.offsetWidth || 170;
        el.scrollBy({ left: dir * cardW * 4, behavior: "smooth" });
    };

    return (
        <section className="mt-6 px-4 space-y-4 relative overflow-visible">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

            {/* Strzałki przewijania (desktop) */}
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

            {/* Lista plakatów */}
            <div
                ref={scrollRef}
                className="relative flex gap-4 overflow-x-auto pb-3 scrollbar-none group"
            >
                {movies.map((m) => (
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

                            {/* Overlay */}
                            <div
                                className="absolute inset-0 rounded-lg flex flex-col justify-between
                                    bg-gradient-to-t from-black/80 via-black/50 to-transparent
                                    opacity-0 hover:opacity-100 transition-opacity"
                            >
                                {/* Gwiazdka i ocena */}
                                <div className="flex justify-start p-2">
                                    <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-sm text-white font-medium shadow-sm">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        {(m.vote_average ?? 0).toFixed(1)}
                                    </span>
                                </div>

                                {/* Tytuł i przyciski */}
                                <div>
                                    <p className="px-3 pt-2 pb-1 text-base font-semibold text-white line-clamp-2">
                                        {m.title}
                                    </p>

                                    <div className="flex items-center justify-between px-3 pb-3 text-sm text-white">
                                        <div className="flex gap-2">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium shadow-md transition">
                                                Oceń
                                            </button>
                                            <button className="bg-white/90 hover:bg-white text-black px-3 py-1.5 rounded-md font-medium shadow-md transition">
                                                Do obejrzenia
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}