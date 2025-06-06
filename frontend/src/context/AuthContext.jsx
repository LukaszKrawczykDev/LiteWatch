import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");

    // Synchronizuj klasę 'dark' na <html>
    useEffect(() => {
        const savedToken = localStorage.getItem("jwt");
        if (savedToken && !user) {
            // ▼ Opcjonalnie: wywołaj backend, by zweryfikować token
            fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
                headers: { Authorization: `Bearer ${savedToken}` },
            })
                .then((r) => r.json())
                .then((u) => login(u, savedToken))
                .catch(() => localStorage.removeItem("jwt")); // token nie­ważny
        }
    }, []);               // ← pusty deps-array ⇒ tylko raz

// 2️⃣  Za każdym razem, gdy zmienia się theme – ustaw / zdejmij klasę `dark`
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme])

    // Auth helpers
    const login = (userData, token) => {
        localStorage.setItem("jwt", token);      // ⬅ zapis
        setUser(userData);
    };
    const logout = () => {
        localStorage.removeItem("jwt");          // ⬅ czyszczenie
        setUser(null);
    };
    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
