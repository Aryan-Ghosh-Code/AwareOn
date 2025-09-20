import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { ProblemProps } from "@/interfaces/interfaces";
import { useState } from "react";

interface ProblemDetailsProps {
	problem: ProblemProps;
}

const ProblemContent = ({ problem }: ProblemDetailsProps) => {
	const [mapType, setMapType] = useState<"standard" | "hybrid">("standard");

	const toggleMapType = () => {
		setMapType(mapType === "standard" ? "hybrid" : "standard");
	};

	return (
		<View className="flex-col items-center justify-center gap-6 mb-6">
			<View className="w-full rounded-2xl overflow-hidden shadow-lg bg-[#242038] border border-gray-700">
				<View className="h-80 p-3 rounded-lg overflow-hidden">
					<Image
						source={{ uri: problem.url }}
						className="w-full h-full rounded-lg"
						resizeMode="cover"
					/>
				</View>

				<View className="p-6 space-y-4">
					<View className="w-full">
						<View className="flex-row items-center gap-2 mb-3">
							<Icon name="leaf" size={20} color="#34d399" />
							<Text className="text-lg font-semibold text-gray-200">
								SDGs Targeted
							</Text>
						</View>
						<View className="flex-row flex-wrap gap-2">
							{problem.SDG.map((sdg: string, index: number) => (
								<View
									key={index}
									className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40"
								>
									<Text className="text-emerald-300 text-sm font-medium">
										SDG {sdg}
									</Text>
								</View>
							))}
						</View>
					</View>
				</View>
			</View>

			<View className="rounded-2xl overflow-hidden shadow-lg bg-[#242038] border border-gray-700 p-6">
				<View className="flex-row items-center justify-between gap-2 mb-4">
					<View className="flex-row items-center gap-1">
						<Icon name="map-marker" size={20} color="#60a5fa" />
						<Text className="text-lg font-semibold text-gray-200">
							Location Details
						</Text>
					</View>

					<TouchableOpacity
						onPress={toggleMapType}
						className={`px-4 py-2 rounded-xl flex-row items-center gap-2 ${mapType === "hybrid"
							? "bg-blue-600/20 border border-blue-500/40"
							: "bg-gray-600/20 border border-gray-500/40"
							}`}
					>
						<Icon
							name={mapType === "hybrid" ? "satellite-variant" : "map"}
							size={16}
							color={mapType === "hybrid" ? "#60a5fa" : "#9ca3af"}
						/>
						<Text
							className={`text-sm font-medium ${mapType === "hybrid" ? "text-blue-300" : "text-gray-400"
								}`}
						>
							{mapType === "hybrid" ? "Satellite" : "Standard"}
						</Text>
					</TouchableOpacity>
				</View>

				<View className="mb-4 rounded-lg overflow-hidden">
					<MapView
						style={{ width: "100%", height: 280 }}
						region={{
							latitude: problem.location.lat,
							longitude: problem.location.lon,
							latitudeDelta: 0.002775,
							longitudeDelta: 0.002775,
						}}
						mapType={mapType}
					>
						<Marker
							coordinate={{
								latitude: problem.location.lat,
								longitude: problem.location.lon,
							}}
							title={problem.problem}
						/>
					</MapView>
				</View>

				<View className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
					<Text className="text-gray-300 text-sm leading-relaxed">
						<Text className="font-semibold text-blue-300">Address:</Text>{"\n"}
						{problem.location?.address}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ProblemContent;