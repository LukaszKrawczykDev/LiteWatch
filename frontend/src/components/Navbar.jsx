import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
    const {
        user,
        logout,
        toggleTheme,
        theme,
        watchCount,
    } = useAuth();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [query, setQuery] = useState("");
    const nav = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        nav(`/search?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
    };

    return (
        <nav className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
            <div className="text-xl font-bold cursor-pointer" onClick={() => nav("/")}>
                🎬 LiteWatch
            </div>

            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Szukaj filmów..."
                    className="flex-1 md:w-64 px-3 py-1.5 rounded-l border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800"
                />
                <button className="px-4 rounded-r bg-blue-600 hover:bg-blue-700 text-white">
                    🔍
                </button>
            </form>

            <div className="flex gap-4 items-center">
                {user && (
                    <>
                        <Link to="/library" className="text-sm hover:underline">
                            Biblioteka
                        </Link>
                        <Link to="Watchlist" className="relative text-sm hover:underline">
                            Watchlista
                            {watchCount > 0 && (
                                <span className="absolute -right-4 -top-2 text-xs bg-blue-600 text-white rounded-full px-1.5">
                                    {watchCount}
                                  </span>
                            )}
                        </Link>
                    </>
                )}

                {!user ? (
                    <>
                        <button onClick={() => setShowLogin(true)}>Zaloguj</button>
                        <button onClick={() => setShowRegister(true)}>Zarejestruj</button>
                    </>
                ) : (
                    <>
                        <span className="hidden sm:inline">Witaj, {user.username}</span>
                        <button onClick={logout}>Wyloguj</button>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="relative w-12 h-6 rounded-full bg-light-primary dark:bg-dark-primary focus:outline-none transition-colors duration-300"
                    aria-label="Toggle theme"
                >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}>
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dark-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-light-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </nav>
    );
}