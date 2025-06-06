import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Navbar() {
    const { user, logout, toggleTheme, theme } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700">
            <div className="text-xl font-bold">🎬 LiteWatch</div>

            <div className="flex gap-4 items-center">
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
                <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </nav>
    );
}

export default Navbar;