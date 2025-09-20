import { ChartProps } from '@/interfaces/interfaces';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const TimelineData = ({ data }: ChartProps) => {
	const screenWidth = Dimensions.get("window").width - 60;
	const chartData = {
		labels: [
			"30d",
			"7d",
			"3d",
			"1d",
			"12h",
			"6h",
			"1h",
		],
		datasets: [
			{
				data: [
					data.reportedProblems.thirtyDays,
					data.reportedProblems.sevenDays,
					data.reportedProblems.threeDays,
					data.reportedProblems.oneDay,
					data.reportedProblems.twelveHours,
					data.reportedProblems.sixHours,
					data.reportedProblems.oneHour,
				],
				color: () => `rgba(96, 165, 250, 255)`,
				strokeWidth: 3,
			},
		],
		legend: ["Problems Reported"],
	};

	return (
		<View className="bg-[#242038] rounded-lg shadow-md p-3 flex flex-col items-center justify-center">
			<Text className="text-gray-200 text-lg font-semibold mb-4">
				Problems Distribution by SDG
			</Text>

			<LineChart
				data={chartData}
				width={screenWidth}
				height={280}
				yAxisInterval={1}
				chartConfig={{
					backgroundColor: "#242038",
          backgroundGradientFrom: "#242038",
          backgroundGradientTo: "#242038",
          decimalPlaces: 0,
          color: () => `rgba(96, 165, 250, 255)`,
					labelColor: (opacity = 1) => `rgba(229, 231, 235, ${opacity})`,
					propsForDots: {
						r: "5",
						strokeWidth: "2",
						stroke: "#fff",
						fill: "#93C5FD",
					},
				}}
				bezier
				style={{
					borderRadius: 12
				}}
			/>
		</View>
	)
}

export default TimelineData;