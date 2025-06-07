import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { useState } from "react";

function LoginModal({ onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const [serverError, setServerError] = useState("");
    const errorMap = {
        "Invalid credentials": "Nieprawidłowy email lub hasło",
};
    const onSubmit = async (data) => {
        setServerError("");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
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
                setServerError(errorMap[json.message] || json.message || "Błąd logowania");
            }
        } catch (err) {
            setServerError(errorMap[err.message] || err.message);
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Logowanie</h2>
                {serverError && (
                    <p className="mb-2 text-sm text-red-600">{serverError}</p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            placeholder="Email"
                            {...register("email", {
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
                            {...register("password", {
                                required: "Hasło jest wymagane",
                                minLength: {
                                    value: 8,
                                    message: "Hasło musi mieć min. 8 znaków",
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
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Zaloguj
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

export default LoginModal;