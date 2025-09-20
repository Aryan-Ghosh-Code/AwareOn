import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import type { SendMessageProps } from "../types";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext()
    const apiUrl = import.meta.env.VITE_API_URL;

    const sendMessage = async ({ id, message }: SendMessageProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/community/send-message/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({ message })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                return data;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage };
}

export default useSendMessage;