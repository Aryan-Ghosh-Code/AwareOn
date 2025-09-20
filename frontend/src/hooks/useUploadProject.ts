import { useState } from "react"
import toast from "react-hot-toast";
import type { ProjectCreationProps } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useUploadProject = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const uploadProject = async ({
        name,
        city,
        state,
        startDate,
        endDate,
        SDG,
        aim,
        description,
        objectives,
        target,
        tariff
    }: ProjectCreationProps) => {
        const success = handleInputErrors({
            name,
            city,
            state,
            startDate,
            endDate,
            SDG,
            aim,
            description,
            objectives,
            target,
            tariff
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/${authUser?.role}/project/create-project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("UN-token")}`
                },
                body: JSON.stringify({
                    name,
                    city,
                    state,
                    startDate,
                    endDate,
                    SDG,
                    aim,
                    description,
                    objectives,
                    target,
                    tariff
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Project uploaded successfully!");
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
    return { loading, uploadProject };
}

export default useUploadProject;



function handleInputErrors({
    name,
    city,
    state,
    startDate,
    endDate,
    SDG,
    aim,
    description,
    objectives,
    target,
    tariff
}: ProjectCreationProps): boolean {

    if (!name?.trim()) {
        toast.error("Project name is required");
        return false;
    }

    if (!city?.trim()) {
        toast.error("City is required");
        return false;
    }

    if (!state?.trim()) {
        toast.error("State is required");
        return false;
    }

    if (!startDate) {
        toast.error("Start date is required");
        return false;
    }

    if (!endDate) {
        toast.error("End date is required");
        return false;
    }

    if (new Date(endDate) < new Date(startDate)) {
        toast.error("End date must be after start date");
        return false;
    }

    if (!SDG || SDG.length === 0) {
        toast.error("Select at least one SDG");
        return false;
    }

    if (!aim?.trim()) {
        toast.error("Aim is required");
        return false;
    }

    if (!description?.trim()) {
        toast.error("Description is required");
        return false;
    }

    const nonEmptyObjectives = objectives?.map(o => o.trim()).filter(Boolean) || [];
    if (nonEmptyObjectives.length === 0) {
        toast.error("Add at least one objective");
        return false;
    }

    const validTariff = tariff?.filter((t) => t > 0) || [];
    if (validTariff.length === 0) {
        toast.error("Add at least one tariff amount");
        return false;
    }

    if(target <= 0) {
        toast.error("Set a valid Target.");
        return false;
    }

    return true;
}
