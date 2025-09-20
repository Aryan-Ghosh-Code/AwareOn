import { View, Text, TouchableOpacity } from 'react-native';

const PlanOption = ({ idx, plan, isSelected, onSelect }: { idx: number, plan: number; isSelected: boolean; onSelect: () => void }) => {
	return (
		<TouchableOpacity
			onPress={onSelect}
			activeOpacity={0.8}
			className={`w-full bg-gray-700 p-4 rounded-xl items-center ${isSelected ? "border-2 border-blue-500" : ""}`}
		>
			<View className="flex-col items-center justify-between w-full gap-2">
				<View className="flex-col items-center justify-center">
					<Text className="text-lg font-bold text-gray-200">Plan {String.fromCharCode(65 + idx)}</Text>
					<Text className="text-green-400 text-xl">₹ {plan}</Text>
				</View>
				<View className="w-6 h-6 rounded-full border-2 border-blue-200 items-center justify-center">
					{isSelected && <View className="w-3 h-3 rounded-full bg-blue-500" />}
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default PlanOption