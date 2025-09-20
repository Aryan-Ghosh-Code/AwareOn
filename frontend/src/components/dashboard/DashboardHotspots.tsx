import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { dataset } from "../../constants/GFWDataset";
import HeatMapLayer from "./HeatMapLayer";
import type { HeatMapPoint, HotspotViewState } from "../../types";

const DashboardHotspots = ({ maxLoss, selectedView, setSelectedView, setSelectedState }: HotspotViewState) => {
	const heatData: HeatMapPoint[] = dataset.map((row) => [
		row.lat,
		row.lon,
		row.loss_ha
	] as HeatMapPoint);

	const getIntensityColor = (loss: number) => {
		const intensity = loss / maxLoss;
		if (intensity > 0.8) return '#FF0000';
		if (intensity > 0.6) return '#FF4500';
		if (intensity > 0.4) return '#FFA500';
		if (intensity > 0.2) return '#FFFF00';
		return '#90EE90';
	};

	return (
		<div className="lg:col-span-2">
			<div className="bg-[#242038] rounded-lg p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-gray-200 text-xl font-bold">🗺️ Deforestation Hotspots</h2>
					<div className="flex gap-2">
						<button
							onClick={() => setSelectedView('heatmap')}
							className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedView === 'heatmap'
								? 'bg-red-600 text-white'
								: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
								}`}
						>
							Heatmap
						</button>
						<button
							onClick={() => setSelectedView('markers')}
							className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedView === 'markers'
								? 'bg-red-600 text-white'
								: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
								}`}
						>
							Markers
						</button>
					</div>
				</div>

				<div className="h-[800px] rounded-lg overflow-hidden">
					<MapContainer
						center={[22.8734, 80.6569] as [number, number]}
						zoom={5}
						style={{ height: "100%", width: "100%" }}
						className="leaflet-container"
					>
						<TileLayer
							url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
						/>

						{/* Conditional rendering based on selected view */}
						{selectedView === 'heatmap' && <HeatMapLayer points={heatData} />}

						{selectedView === 'markers' && dataset.map((row, i) => (
							<CircleMarker
								key={i}
								center={[row.lat, row.lon] as [number, number]}
								radius={Math.max(6, Math.log(row.loss_ha) * 2)}
								pathOptions={{
									color: getIntensityColor(row.loss_ha),
									fillOpacity: 0.8,
									weight: 2
								}}
								eventHandlers={{
									click: () => setSelectedState(row.state)
								}}
							>
								<Popup>
									<div className="text-gray-900">
										<b>{row.state}</b><br />
										Forest Loss: {row.loss_ha} ha<br />
										<small>Lat: {row.lat.toFixed(4)}, Lon: {row.lon.toFixed(4)}</small>
									</div>
								</Popup>
							</CircleMarker>
						))}
					</MapContainer>
				</div>

				{/* Legend */}
				<div className="mt-4 flex flex-wrap gap-4 text-sm">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-red-500 rounded"></div>
						<span className="text-gray-400">High Loss (&gt;800 ha)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-orange-500 rounded"></div>
						<span className="text-gray-400">Medium Loss (400-800 ha)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-yellow-500 rounded"></div>
						<span className="text-gray-400">Low Loss (&lt;400 ha)</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardHotspots;