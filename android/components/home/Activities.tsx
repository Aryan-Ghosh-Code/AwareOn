import { activitiesButtons } from "@/constants/activities";
import { ActivitiesButtonsProps } from "@/interfaces/interfaces";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const Activities = () => {
	const [activities, setActivities] = useState<ActivitiesButtonsProps[]>([]);
	const screenWidth = Dimensions.get('window').width;
	const isTablet = screenWidth > 768;
	const isLarge = screenWidth > 1024;

	useEffect(() => {
		setActivities(activitiesButtons);
	}, []);

	const getNumColumns = () => {
		if (isLarge) return 4;
		if (isTablet) return 2;
		return 1;
	};

	const getItemWidth = () => {
		const numColumns = getNumColumns();
		const totalPadding = 48;
		const gap = 24;
		const totalGaps = (numColumns - 1) * gap;
		return (screenWidth - totalPadding - totalGaps) / numColumns;
	};

	const handleActivityPress = (path: string) => {
		router.push(path as any);
	};

	const renderActivityGrid = () => {
		const numColumns = getNumColumns();
		const itemWidth = getItemWidth();
		const rows = [];

		for (let i = 0; i < activities.length; i += numColumns) {
			const rowItems = activities.slice(i, i + numColumns);
			rows.push(
				<View key={i} className="flex-row justify-between mb-6">
					{rowItems.map((activity, index) => (
						<TouchableOpacity
							key={i + index}
							style={{ width: itemWidth }}
							className={`flex items-center justify-center py-6 text-lg font-semibold rounded-2xl shadow-md ${i % 2 === 0 ? "bg-[#1d4d86]" : "bg-[#49752b]"} active:${i % 2 === 0 ? "bg-[#2298b9]" : "bg-[#71af3e]"}`}
							activeOpacity={0.8}
							onPress={() => handleActivityPress(activity.path)}
						>
							<Text className="text-white text-lg font-semibold text-center px-2">
								{activity.label}
							</Text>
						</TouchableOpacity>
					))}
					{rowItems.length < numColumns &&
						Array.from({ length: numColumns - rowItems.length }).map((_, emptyIndex) => (
							<View key={`empty-${i}-${emptyIndex}`} style={{ width: itemWidth }} />
						))
					}
				</View>
			);
		}
		return rows;
	};

	return (
		<View className="px-4 mt-12 pb-6 w-full flex items-center justify-center">
			<View className="w-full flex flex-col gap-1 items-center justify-center">
				<Text className="text-white text-2xl font-bold mb-3 text-center uppercase">
					Activities
				</Text>
				<Text className="text-[#B0B0B0] text-center">
					Explore our key features and tools
				</Text>
			</View>

			<View className="mt-8">
				{renderActivityGrid()}
			</View>
		</View>
	);
};

export default Activities;