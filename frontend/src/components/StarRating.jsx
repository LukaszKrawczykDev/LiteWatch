import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, onChange, readOnly = false }) {
    const [hover, setHover] = useState(null);

    const display = hover ?? value;
    const stars = Array.from({ length: 5 }, (_, i) => i + 1); // 1-5

    return (
        <div className="flex gap-1">
            {stars.map((s) => {
                const full = display >= s * 2;
                const half = display === s * 2 - 1;
                return (
                    <button
                        key={s}
                        disabled={readOnly}
                        onMouseEnter={() => !readOnly && setHover(s * 2)}
                        onMouseLeave={() => !readOnly && setHover(null)}
                        onClick={() => !readOnly && onChange(s * 2)}
                        className="transition-transform hover:scale-110"
                    >
                        <Star
                            className={`w-7 h-7
                ${
                                full
                                    ? "fill-yellow-400 text-yellow-400"
                                    : half
                                        ? "fill-yellow-300 text-yellow-300"
                                        : "text-zinc-400 dark:text-zinc-600"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}