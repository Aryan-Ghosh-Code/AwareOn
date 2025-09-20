import { useState } from "react";
import Toast from 'react-native-toast-message';
import { EXPO_API_URL } from "@/configs/env";
import cleanUpToken from "@/utils/cleanUpToken";
import { useAuthContext } from "@/context/AuthContext";

const useGetProblemById = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const getProblemById = async (id: string) => {
        const token = await cleanUpToken() as string;
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/problem/problem-repository/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                return data;
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

    return { loading, getProblemById }
}

export default useGetProblemById;