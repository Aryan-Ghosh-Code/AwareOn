import { useState } from "react"
import toast from "react-hot-toast";
import type { ProblemCreationProps } from "../types";
import { useAuthContext } from "../context/AuthContext";

const usePostProblem = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const postProblem = async ({
        url,
        description,
        lat,
        lon
    }: ProblemCreationProps) => {
        const success = handleInputErrors({
            url,
            description,
            lat,
            lon
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/problem/post-problem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    url,
                    description,
                    lat,
                    lon
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Problem posted successfully!");
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
    return { loading, postProblem };
}

export default usePostProblem;



function handleInputErrors({
    url,
    description,
    lat,
    lon
}: ProblemCreationProps): boolean {
    if (!url) {
        toast.error("Image url is required");
        return false;
    }

    if (!lat || !lon) {
        toast.error("Location access is required");
        return false;
    }

    return true;
}
