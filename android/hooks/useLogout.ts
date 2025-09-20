import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import { EXPO_API_URL } from "@/configs/env";
import cleanUpToken from "@/utils/cleanUpToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    const apiUrl = EXPO_API_URL

    const logout = async () => {
        setLoading(true);
        const token = cleanUpToken()
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/auth/logout/${authUser?._id}`, {
                method: "POST",
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
                await Promise.all([
                    AsyncStorage.removeItem("UN-token"),
                    AsyncStorage.removeItem("UN-user"),
                    AsyncStorage.removeItem("UN-expiry")
                ]);
                setAuthUser(null);

                Toast.show({
                    type: 'success',
                    text1: 'Logged out successfully!',
                    text2: 'Thank you for using Aab-o-Hawa',
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