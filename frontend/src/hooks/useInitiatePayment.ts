import { useState } from "react"
import toast from "react-hot-toast";
import type { PaymentInitiationProps } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useInitiatePayment = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const initiatePayment = async ({
        amount,
        projectId
    }: PaymentInitiationProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/payments/pay-funds`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    amount,
                    projectId
                })
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
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }
    return { loading, initiatePayment };
}

export default useInitiatePayment;
