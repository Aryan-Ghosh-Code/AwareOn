import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useJoinOpenCommunity = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const joinOpenCommunity = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/community/open-communities/join/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Community joined successfully!");
                navigate(`/open-community/${data._id}`);
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

    return { loading, joinOpenCommunity }
}

export default useJoinOpenCommunity;