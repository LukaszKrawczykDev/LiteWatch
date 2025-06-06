import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginModal({ onClose }) {
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (res.ok) {
                login(json.user, json.token);
                onClose();
            } else {
                throw new Error(json.message || "Błąd logowania");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Logowanie</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="w-full p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                    />
                    <input
                        placeholder="Hasło"
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full p-2 rounded border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Zaloguj
                        </button>
                        <button onClick={onClose} type="button" className="text-sm text-gray-500">
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
