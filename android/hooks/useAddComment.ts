import { useState } from "react";
import Toast from 'react-native-toast-message';
import { EXPO_API_URL } from "@/configs/env";
import cleanUpToken from "@/utils/cleanUpToken";
import { AddCommentProps } from "@/interfaces/interfaces";

const useAddComment = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const addComment = async ({
        id,
        type,
        message
    }: AddCommentProps) => {
        const token = await cleanUpToken() as string;
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/comments/add-comment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    type,
                    message
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                Toast.show({
                    type: 'success',
                    text1: "✅ Comment added successfully!",
                    position: 'top',
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'top',
                });
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