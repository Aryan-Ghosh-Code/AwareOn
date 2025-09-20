import { useState } from "react";
import toast from "react-hot-toast";
import type { AddCommentProps } from "../types";

const useAddComment = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const addComment = async ({
        id,
        type,
        message
    }: AddCommentProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/comments/add-comment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    type,
                    message
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("✅ Comment added successfully!");
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

    return { loading, addComment }
}

export default useAddComment;