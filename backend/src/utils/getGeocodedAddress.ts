const getGeocodedAddress = async (latitude: number, longitude: number) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            return data.results[0].formatted_address;
        } else {
            console.log("No address found for these coordinates.");
            return "";
        }
    } catch (err) {
        console.error("Error fetching address:", err);
    }
}

export default getGeocodedAddress;