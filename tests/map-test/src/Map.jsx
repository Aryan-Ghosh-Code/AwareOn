import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapWithLocation = () => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAP_ID;

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(async (google) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            console.log(userLocation)

            // Initialize map
            const map = new google.maps.Map(mapRef.current, {
              center: userLocation,
              zoom: 17,
              mapId
            });

            // Use AdvancedMarkerElement
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            new AdvancedMarkerElement({
              map,
              position: userLocation,
              title: "You are here!",
            });

            // Fetch human-readable address
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
              );
              const data = await response.json();

              if (data.status === "OK" && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
              } else {
                console.warn("No address found for these coordinates.");
              }
            } catch (err) {
              console.error("Error fetching address:", err);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    });
  }, []);

  return (
    <div>
      <h2>My Current Location (via Google Maps API)</h2>
      <div
        ref={mapRef}
        style={{ width: "600px", height: "450px", borderRadius: "10px" }}
      />
      {address && (
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
          📍 {address}
        </p>
      )}
    </div>
  );
};

export default MapWithLocation;