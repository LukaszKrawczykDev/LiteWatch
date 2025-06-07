import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { useState } from "react";

function RegisterModal({ onClose }) {
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login } = useAuth();
    const [serverError, setServerError] = useState("");
    const errorMap = {
        "Email already exists": "Konto na podany email zostało już założone!",
    };

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            const json = await res.json();

            if (res.ok) {
                login(json.user, json.token);
                onClose();
            } else {
                setServerError(json.message || "Błąd rejestracji");
            }
        } catch (err) {
            setServerError(err.message);
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Rejestracja</h2>
                {serverError && (
                    <p className="mb-2 text-sm text-red-600">{serverError}</p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            placeholder="Nazwa użytkownika"
                            {...formRegister("username", {
                                required: "Nazwa użytkownika jest wymagana",
                                minLength: {
                                    value: 3,
                                    message: "Nazwa musi mieć co najmniej 3 znaki",
                                },
                            })}
                            className="w-full p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Email"
                            {...formRegister("email", {
                                required: "Email jest wymagany",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Niepoprawny email",
                                },
                            })}
                            className="w-full p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Hasło"
                            type="password"
                            {...formRegister("password", {
                                required: "Hasło jest wymagane",
                                minLength: {
                                    value: 8,
                                    message: "Hasło musi mieć co najmniej 8 znaków",
                                },
                            })}
                            className="w-full p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                        >
                            Zarejestruj
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-sm text-gray-500"
                        >
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default RegisterModal;