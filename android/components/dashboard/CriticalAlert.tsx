import { StateDataProps } from '@/interfaces/interfaces';
import { View, Text } from 'react-native';

const CriticalAlert = ({ stateData }: StateDataProps) => {
  return (
    <View className="bg-red-900/30 border border-red-500 rounded-lg p-4 w-full">
			<Text className="text-red-400 font-bold mb-2 text-lg">🚨 Critical Alert</Text>
			<Text className="text text-red-200">
				{stateData[0]?.state} shows the highest deforestation rate with {stateData[0]?.loss_ha.toFixed(1)} ha lost.
			</Text>
		</View>
  )
}

export default CriticalAlert;