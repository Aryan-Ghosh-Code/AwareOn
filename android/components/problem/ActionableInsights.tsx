import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ActionableInsightsProps {
	actionableInsights: string[];
}

const ActionableInsights = ({ actionableInsights }: ActionableInsightsProps) => {
	return (
		<View className="rounded-2xl bg-[#242038] border border-gray-700 p-6 shadow-lg mb-6">
			<View className="flex-row items-center gap-3 mb-6">
				<View className="bg-orange-500 rounded-lg p-2">
					<Icon name="alert" size={20} color="#d1d5db" />
				</View>
				<Text className="text-lg font-semibold text-gray-100">
					Actionable Insights & Recommendations
				</Text>
			</View>

			<View className="grid gap-4">
				{actionableInsights.map((tip, idx) => (
					<View key={idx} className="flex-row flex-wrap gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-600 hover:border-orange-500/40 transition-colors">
						<View className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/40">
							<Text className="text-orange-400 text-sm font-bold">{idx + 1}</Text>
						</View>
						<Text className="text-gray-200 text-xs">{tip}</Text>
					</View>
				))}
			</View>
		</View>
	)
}

export default ActionableInsights;