import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-auto w-full border-t border-light-textSecondary dark:border-dark-textSecondary bg-light-surface dark:bg-dark-surface backdrop-blur px-6 py-8"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-left text-xs uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                    Projekt – Szkielety programistyczne w aplikacjach internetowych
                </div>
                <div className="flex-1 text-center flex flex-col items-center space-y-2">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                        Spodobała Ci się strona?
                    </p>
                    <a
                        href="https://github.com/LukaszKrawczykDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-light-accent dark:text-dark-accent hover:text-light-primaryLight dark:hover:text-dark-primary transition-colors duration-200"
                    >
                        <Github className="w-5 h-5" />
                        Zajrzyj na mojego GitHuba
                    </a>
                </div>
                <div className="flex-1 text-right text-sm font-semibold text-light-text dark:text-dark-text">
                    Autor: Łukasz Krawczyk
                </div>
            </div>
        </motion.footer>
    );
}