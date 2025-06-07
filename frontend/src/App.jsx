// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";       // 🆕
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import SearchResults from "./pages/SearchResults";
import MoviePage from "./pages/MoviePage";
import Watchlist from "./pages/Watchlist.jsx";
import Library from "./pages/Library";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/movie/:id" element={<MoviePage />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/library" element={<Library />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;