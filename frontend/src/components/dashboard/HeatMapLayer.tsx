import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { HeatMapPoint } from "../../types";

const HeatMapLayer = ({ points }: { points: HeatMapPoint[] }) => {
    const map = useMap();

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).L && (window as any).L.heatLayer) {
            const heat = (window as any).L.heatLayer(points, {
                radius: 25,
                blur: 15,
                maxZoom: 8,
                gradient: {
                    0.0: 'blue',
                    0.2: 'cyan',
                    0.4: 'lime',
                    0.6: 'yellow',
                    0.8: 'orange',
                    1.0: 'red'
                }
            }).addTo(map);

            return () => {
                map.removeLayer(heat);
            };
        }
    }, [map, points]);

    return null;
};

export default HeatMapLayer;