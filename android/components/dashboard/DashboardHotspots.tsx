import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Circle, Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { HotspotViewState } from "@/interfaces/interfaces";
import { dataset } from "@/constants/GFWDataset";

const DashboardHotspots = ({ maxLoss, setSelectedState }: HotspotViewState) => {
	const [selectedView, setSelectedView] = useState<"heatmap" | "markers">("heatmap");
	const mapRef = useRef<MapView>(null);

	const heatData = dataset.map((row) => ({
		latitude: row.lat,
		longitude: row.lon,
		weight: row.loss_ha / maxLoss,
	}));

	const getIntensityColor = (loss: number) => {
		const intensity = loss / maxLoss;
		if (intensity > 0.8) return "red";
		if (intensity > 0.6) return "orangered";
		if (intensity > 0.4) return "orange";
		if (intensity > 0.2) return "yellow";
		return "lightgreen";
	};

	// Auto zooming to fit all markers
	useEffect(() => {
		if (mapRef.current && dataset.length > 0) {
			const coords = dataset.map((row) => ({
				latitude: row.lat,
				longitude: row.lon,
			}));

			mapRef.current.fitToCoordinates(coords, {
				edgePadding: { top: 50, right: 40, bottom: 30, left: 50 },
				animated: true,
			});
		}
	}, [selectedView]);

	return (
		<View className="bg-[#242038] rounded-2xl p-4 shadow-xl">
			{/* Header */}
			<View className="flex-col justify-between items-center mb-4 gap-2">
				<Text className="text-gray-200 text-xl font-bold">🗺️ Deforestation Hotspots</Text>
				<View className="flex-row gap-2">
					<TouchableOpacity
						onPress={() => setSelectedView("heatmap")}
						className={`px-3 py-1 rounded ${selectedView === "heatmap" ? "bg-red-600" : "bg-gray-700"}`}
					>
						<Text className={selectedView === "heatmap" ? "text-white" : "text-gray-300"}>Heatmap</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setSelectedView("markers")}
						className={`px-3 py-1 rounded ${selectedView === "markers" ? "bg-red-600" : "bg-gray-700"}`}
					>
						<Text className={selectedView === "markers" ? "text-white" : "text-gray-300"}>Markers</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Map */}
			<View className="h-[500px] rounded-xl overflow-hidden w-[325px]">
				<MapView
					ref={mapRef}
					style={{ flex: 1 }}
					provider={PROVIDER_GOOGLE}
					mapType="hybrid"
				>
					{selectedView === "heatmap" && (
						<Heatmap
							points={heatData}
							radius={40}
							opacity={0.7}
							gradient={{
								colors: ["blue", "cyan", "lime", "yellow", "orange", "red"],
								startPoints: [0.01, 0.2, 0.4, 0.6, 0.8, 1],
								colorMapSize: 256,
							}}
						/>
					)}

					{selectedView === "markers" &&
						dataset.map((row, i) => (
							<React.Fragment key={i}>
								<Marker
									coordinate={{ latitude: row.lat, longitude: row.lon }}
									title={row.state}
									description={`Forest Loss: ${row.loss_ha} ha`}
									onPress={() => setSelectedState(row.state)}
								/>
								<Circle
									center={{ latitude: row.lat, longitude: row.lon }}
									radius={Math.max(5000, Math.log(row.loss_ha) * 2000)}
									strokeColor={getIntensityColor(row.loss_ha)}
									fillColor={getIntensityColor(row.loss_ha) + "88"}
									strokeWidth={10}
								/>
							</React.Fragment>
						))}
				</MapView>
			</View>
		</View>
	);
};

export default DashboardHotspots;