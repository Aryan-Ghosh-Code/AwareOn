import { useState } from "react";
import toast from "react-hot-toast";
import type { DepartmentProps } from "../types";

const useRegisterMinistry = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const registerMinistry = async ({
        name,
        contact
    }: DepartmentProps) => {
        const success = handleInputErrors({ name, contact });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/govt/onboard/register-ministry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    name,
                    contact
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Department registered successfully!");
                return data;
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

    return { loading, registerMinistry }
}

export default useRegisterMinistry;


function handleInputErrors({ name, contact }: DepartmentProps) {
    if (!name || !contact) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (contact.length !== 10) {
        toast.error("Enter a valid Mobile Number");
        return false;
    }

    return true;
}