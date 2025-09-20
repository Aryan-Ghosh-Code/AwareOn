import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface LocationProps {
  lat: number;
  lon: number;
  address?: string;
  height?: number;
  zoom?: number;
  showAddress?: boolean;
};


const MapWithLocation = ({ lat, lon, address }: LocationProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAP_ID;

    const loader = new Loader({
      apiKey,
      version: "weekly",
    });

    loader.load().then(async (google) => {
      if (!mapRef.current) return;

      // Initialize map with backend coords
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng: lon },
        zoom: 18,
        mapId,
      });

      // Marker
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      new AdvancedMarkerElement({
        map,
        position: { lat, lng: lon },
        title: address || "Reported Problem Location",
      });
    });
  }, [lat, lon, address]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "450px", borderRadius: "10px" }}
      />
      {address && (
        <p className="mt-2 text-sm text-gray-300">📍 {address}</p>
      )}
    </div>
  );
};

export default MapWithLocation;
