import { dataset } from '@/constants/GFWDataset';
import { View, Text } from 'react-native';

interface DashboardStatsProps {
	totalLoss: number;
	avgLoss: number;
	maxLoss: number;
}

const DashboardStats = ({ totalLoss, avgLoss, maxLoss }: DashboardStatsProps) => {
	return (
		<View className="py-3">
			<View className="flex-row gap-4 mb-4">
				<View className="bg-[#242038] rounded-lg p-4 border-l-4 border-red-500">
					<Text className="text-sm font-medium text-gray-400">Total Forest Loss</Text>
					<Text className="text-2xl font-bold text-red-400">{totalLoss.toFixed(2)} ha</Text>
				</View>
				<View className="bg-[#242038] rounded-lg p-4 border-l-4 border-orange-500">
					<Text className="text-sm font-medium text-gray-400">Average Loss</Text>
					<Text className="text-2xl font-bold text-orange-400">{avgLoss.toFixed(2)} ha</Text>
				</View>
			</View>

			<View className="flex-row gap-4 mb-4">
				<View className="bg-[#242038] rounded-lg p-4 border-l-4 border-yellow-500">
					<Text className="text-sm font-medium text-gray-400">Hotspots Detected</Text>
					<Text className="text-2xl font-bold text-yellow-400">{dataset.length}</Text>
				</View>
				<View className="bg-[#242038] rounded-lg p-4 border-l-4 border-green-500">
					<Text className="text-sm font-medium text-gray-400">Max Single Loss</Text>
					<Text className="text-2xl font-bold text-green-400">{maxLoss.toFixed(2)} ha</Text>
				</View>
			</View>
		</View>
	)
}

export default DashboardStats;