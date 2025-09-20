import { useState } from "react";
import toast from "react-hot-toast";
import type { GovSignupParams } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useSignupGov = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const signupGov = async ({
        govtId,
        name,
        email,
        mobileNo,
        city,
        state,
        pincode,
        password
    }: 
    GovSignupParams) => {
        const success = handleInputErrors({
            govtId,
            name,
            email,
            mobileNo,
            city,
            state,
            pincode,
            password
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/govt/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    govtId,
                    name,
                    email,
                    mobileNo,
                    city,
                    state,
                    pincode,
                    password
                })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Store with expiry (30 days)
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000;

            localStorage.setItem("UN-token", data.token);
            localStorage.setItem("UN-user", JSON.stringify(data));
            localStorage.setItem("UN-expiry", expiry.toString());

            setAuthUser(data);

            toast.success("Government user signed up successfully");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.error(error);
            } else {
                console.error("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, signupGov };
};

export default useSignupGov;

// ---------------------
// Input Validation
// ---------------------
function handleInputErrors({
    govtId,
    name,
    email,
    mobileNo,
    city,
    state,
    pincode,
    password
}: GovSignupParams) {
    if (!govtId || !name || !email || !mobileNo || !city || !state || !pincode || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be at least 6 characters long");
        return false;
    }

    if (mobileNo.length !== 10) {
        toast.error("Enter a valid Mobile No.");
        return false;
    }

    if (pincode.length !== 6) {
        toast.error("Enter a valid Pincode");
        return false;
    }

    return true;
}
