import { ChartProps } from '@/interfaces/interfaces';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ProblemStatus = ({ data }: ChartProps) => {
	const screenWidth = Dimensions.get("window").width - 60;
	const chartData = {
		labels: ["Pending", "Ongoing", "Resolved"],
		datasets: [
			{
				data: [
					data.problemStatus.pending,
					data.problemStatus.ongoing,
					data.problemStatus.resolved,
				],
			},
		],
	};

	return (
		<View className="bg-[#242038] rounded-lg shadow-md p-3 flex flex-col items-center justify-center">
			<Text className="text-gray-200 text-lg font-semibold mb-4">
				Problems Distribution by SDG
			</Text>

			<BarChart
				data={chartData}
				width={screenWidth}
				height={220}
				yAxisLabel=""
				yAxisSuffix=""
				fromZero={true}
				showValuesOnTopOfBars={true}
				chartConfig={{
					backgroundColor: "#242038",
					backgroundGradientFrom: "#242038",
					backgroundGradientTo: "#242038",
					decimalPlaces: 0,
					color: () => `rgba(96, 165, 250, 255)`,
					labelColor: (opacity = 1) => `rgba(229, 231, 235, ${opacity})`,
					propsForBackgroundLines: {
						strokeWidth: 0,
					}
				}}
				style={{
					borderRadius: 16,
				}}
			/>
		</View>
	)
}

export default ProblemStatus;