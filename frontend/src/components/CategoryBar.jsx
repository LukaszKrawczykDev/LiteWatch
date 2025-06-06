// src/components/CategoryBar.jsx
const categories = [
    "Akcja", "Komedia", "Sci-Fi", "Fantasy",
    "Horror", "Dramat", "Animacja", "Romans",
];

export default function CategoryBar() {
    return (
        <div className="w-full border-b border-zinc-200 dark:border-zinc-700">
            <ul className="flex justify-center gap-6 px-4 py-3 text-sm font-medium whitespace-nowrap">
                {categories.map((c) => (
                    <li
                        key={c}
                        className="cursor-pointer text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        {c}
                    </li>
                ))}
            </ul>
        </div>
    );
}