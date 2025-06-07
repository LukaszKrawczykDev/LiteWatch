import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser]         = useState(null);
    const [theme, setTheme]       = useState("light");
    const [init, setInit]         = useState(false);
    const [watchCount, setWatchCount] = useState(0);      // 🆕

    /* dark / light */
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    /* restore session + watchCount */
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return setInit(true);

        (async () => {
            try {
                const resMe = await fetch(`${API}/api/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (resMe.ok) {
                    const me = await resMe.json();
                    setUser({ id: me._id, username: me.username, email: me.email });

                    const list = await fetch(`${API}/api/watchlist/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((r) => r.json());
                    setWatchCount(list.length);
                } else {
                    localStorage.removeItem("jwt");
                }
            } catch {
                localStorage.removeItem("jwt");
            } finally {
                setInit(true);
            }
        })();
    }, []);

    /* helpers */
    const login = (u, token) => {
        if (token) localStorage.setItem("jwt", token);
        setUser(u);
    };
    const logout = () => {
        localStorage.removeItem("jwt");
        setUser(null);
        setWatchCount(0);
    };
    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    if (!init) return null; // czekamy aż odtworzy sesję

    return (
        <AuthContext.Provider
            value={{ user, login, logout, theme, toggleTheme, watchCount, setWatchCount }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);