import { useState } from "react";
import toast from "react-hot-toast";
import type { SubmitReportProps } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useGenerateReport = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const generateReport = async ({
        id,
        type,
        startDate,
        endDate,
        actions,
        workforce,
        articulateProof
    }: SubmitReportProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/reports/generate-report/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    type,
                    startDate,
                    endDate,
                    actions,
                    workforce,
                    articulateProof
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("✅ Report submitted successfully!");
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

    return { loading, generateReport }
}

export default useGenerateReport;