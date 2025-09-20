import toast from "react-hot-toast";
import type { Coordinates } from "../types";

/**
 * Gets user's current latitude & longitude.
 */
export const getUserCoordinates = async (): Promise<Coordinates> => {
    try {
        if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported by this browser.");
        }

        return await new Promise<Coordinates>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lon: longitude });
                },
                (error) => {
                    reject(new Error(`Geolocation error: ${error.message}`));
                }
            );
        });
    } catch (err) {
        console.log("Error fetching coordinates:", err);
        toast.error("Error in fetching location");
        throw err; // rethrow so caller can handle
    }
};
