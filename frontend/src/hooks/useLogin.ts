import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import type { LoginParams } from "../types";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async ({ role, email, password }: LoginParams) => {
        const success = handleInputErrors({ email, password, role });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${role}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            // Storing user data with expiry
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

            localStorage.setItem("UN-token", data.token);
            localStorage.setItem("UN-user", JSON.stringify(data));
            localStorage.setItem("UN-expiry", expiry.toString());
            setAuthUser(data);

            if (data) {
                toast.success("Logged in successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;


function handleInputErrors({ email, password, role }: LoginParams) {
    if (!email || !password || !role) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (role !== "user" && role !== "ngo" && role !== "govt") {
        toast.error("Please give a valid role");
        return false;
    }

    if (password.length < 6) {
        toast.error("password should be atleast 6 characters long");
        return false;
    }

    return true;
}