import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/auth/logout/${authUser?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("UN-token");
            localStorage.removeItem("UN-user");
            localStorage.removeItem("UN-expiry");
            setAuthUser(null);

            if (data) {
                toast.success("Logged out successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            }
            else
                console.log("An unknown error occured");
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout };
}

export default useLogout;