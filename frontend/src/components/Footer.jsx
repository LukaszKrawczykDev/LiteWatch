// src/components/Footer.jsx
export default function Footer() {
    return (
        <footer className="mt-auto w-full border-t border-zinc-200 dark:border-zinc-700 px-4 py-6 text-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-zinc-600 dark:text-zinc-400">
                    © {new Date().getFullYear()} LiteWatch — Wersja MVP
                </p>

                <ul className="flex gap-6 text-zinc-600 dark:text-zinc-400">
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">
                        O nas
                    </li>
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">
                        Regulamin
                    </li>
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">
                        Kontakt
                    </li>
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">
                        GitHub
                    </li>
                </ul>
            </div>
        </footer>
    );
}