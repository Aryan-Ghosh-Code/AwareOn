import { useState } from "react"
import toast from "react-hot-toast";
import type { PaymentVerificationProps } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useVerifyPayment = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const verifyPayment = async ({
        razorpay_payment_id,
        razorpay_payment_link_id,
        razorpay_payment_link_reference_id,
        razorpay_payment_link_status,
        razorpay_signature,
        projectId,
    }: PaymentVerificationProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/payments/verify-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    razorpay_payment_id,
                    razorpay_payment_link_id,
                    razorpay_payment_link_reference_id,
                    razorpay_payment_link_status,
                    razorpay_signature,
                    projectId,
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Payment Verified");
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
    return { loading, verifyPayment };
}

export default useVerifyPayment;