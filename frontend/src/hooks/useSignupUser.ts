import { useState } from "react"
import toast from "react-hot-toast";
import type { UserSignupParams } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useSignupUser = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const signup = async ({
        name,
        email,
        city,
        state,
        pincode,
        mobileNo,
        password,
        gender
    }:
        UserSignupParams) => {
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

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
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
                throw new Error(data.error);
            }

            // Storing user data with expiry
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

            localStorage.setItem("UN-token", data.token);
            localStorage.setItem("UN-user", JSON.stringify(data));
            localStorage.setItem("UN-expiry", expiry.toString());
            setAuthUser(data);

            if (data) {
                toast.success("Signed up Successfully");
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
    return { loading, signup };
}

export default useSignupUser;


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
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if (mobileNo.length !== 10) {
        toast.error("Enter a valid Mobile No.");
        return false;
    }

    if (gender !== "M" && gender !== "F" && gender !== "O") {
        toast.error("Enter a valid gender");
        return false;
    }

    return true;
}