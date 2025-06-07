import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryBar() {
    const [genres, setGenres] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/genres`)
            .then((r) => r.json())
            .then(setGenres);
    }, []);

    return (
        <div className="w-full border-b border-zinc-200 dark:border-zinc-700">
            <ul
                className="
          flex flex-wrap justify-center gap-6 px-4 py-3
          text-sm font-medium whitespace-nowrap
        "
            >
                {genres.map((g) => (
                    <li
                        key={g.id}
                        onClick={() => nav(`/search?genre=${g.id}&name=${g.name}`)}
                        className="
              cursor-pointer text-zinc-600 dark:text-zinc-300
              hover:text-blue-600 dark:hover:text-blue-400 transition
            "
                    >
                        {g.name}
                    </li>
                ))}
            </ul>

        </div>

    );
}