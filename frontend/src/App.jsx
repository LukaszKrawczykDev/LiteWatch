// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";       // 🆕
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <Router>
            <AuthProvider>
                {/* flex-column, aby stopka „doklejała się” do dołu */}
                <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
                    <Navbar />

                    {/* główna część (rośnie) */}
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* inne trasy później */}
                        </Routes>
                    </main>

                    {/* stopka */}
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;