import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_API_URL } from "@/configs/env";
import { UserSignupParams } from "@/interfaces/interfaces";
import cleanUpToken from "@/utils/cleanUpToken";

const useUserSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const signup = async ({
        name,
        email,
        city,
        state,
        pincode,
        mobileNo,
        password,
        gender
    }: UserSignupParams) => {
        const success = handleInputErrors({
            name,
            email,
            city,
            state,
            pincode,
            mobileNo,
            password,
            gender
        });

        if (!success) return;

        const token = await cleanUpToken() as string;
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    city,
                    state,
                    pincode,
                    mobileNo,
                    password,
                    gender
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                const now = new Date().getTime();
                const expiry = now + 30 * 24 * 60 * 60 * 1000;

                await Promise.all([
                    AsyncStorage.setItem("UN-token", data.token),
                    AsyncStorage.setItem("UN-user", JSON.stringify(data)),
                    AsyncStorage.setItem("UN-expiry", expiry.toString())
                ]);
                setAuthUser(data);

                Toast.show({
                    type: 'success',
                    text1: 'Signed up successfully!',
                    text2: 'Welcome to Aab-o-Hawa',
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

    return { loading, signup }
}

export default useUserSignup;


function handleInputErrors({
    name,
    email,
    city,
    state,
    pincode,
    mobileNo,
    password,
    gender
}: UserSignupParams) {
    if (!name || !email || !password || !mobileNo || !gender || !city || !state || !pincode) {
        Toast.show({
            type: 'error',
            text1: "Please fill all the fields",
            position: 'top',
        });
        return false;
    }

    if (password.length < 6) {
        Toast.show({
            type: 'error',
            text1: "Password should be atleast 6 characters long",
            position: 'top',
        });
        return false;
    }

    if (name.length < 2) {
        Toast.show({
            type: 'error',
            text1: "Username should be atleast 2 characters long",
            position: 'top',
        });
        return false;
    }

    if (mobileNo.length !== 10) {
        Toast.show({
            type: 'error',
            text1: "Enter a valid Mobile No.",
            position: 'top',
        });
        return false;
    }

    if (gender !== "M" && gender !== "F" && gender !== "O") {
        Toast.show({
            type: 'error',
            text1: "Enter a valid gender",
            position: 'top',
        });
        return false;
    }

    return true;
}