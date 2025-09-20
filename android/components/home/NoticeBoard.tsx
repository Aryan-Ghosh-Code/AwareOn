import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const NoticeBoard = () => {
	const [notices] = useState([
		{ id: 1, title: "Flood Alert in Assam", date: "Aug 19, 2025" },
		{ id: 2, title: "Heatwave Warning in Delhi NCR", date: "Aug 17, 2025" },
		{ id: 3, title: "Cyclone Warning in Odisha Coast", date: "Aug 14, 2025" },
		{ id: 4, title: "Landslide Alert in Himachal Pradesh", date: "Aug 12, 2025" },
		{ id: 5, title: "Heavy Rainfall Expected in Kerala", date: "Aug 10, 2025" },
		{ id: 6, title: "Another Example News", date: "Aug 8, 2025" },
		{ id: 7, title: "More Warnings Here", date: "Aug 6, 2025" },
	]);

	return (
		<View className="px-4 mt-6 w-[350px]">
			<Text className="text-white text-2xl font-bold mb-3 text-center uppercase">
				Recent Hazard News
			</Text>

			<View className="bg-[#2E2E3A] rounded-xl shadow-lg p-3 h-96">
				<ScrollView
					showsVerticalScrollIndicator={true}
					nestedScrollEnabled={true}
				>
					{notices.map((item) => (
						<TouchableOpacity
							key={item.id}
							activeOpacity={0.7}
							className="bg-[#373F51] rounded-lg p-3 mb-3"
						>
							<Text className="text-white font-semibold">{item.title}</Text>
							<Text className="text-sm text-[#C5EBC3]">{item.date}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

export default NoticeBoard;