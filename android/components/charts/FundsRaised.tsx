import { sdgColors } from '@/constants/chartOptions';
import { ChartProps } from '@/interfaces/interfaces';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const FundsRaised = ({ data }: ChartProps) => {
	const screenWidth = Dimensions.get("window").width - 60;
	const chartData = [
		{
			name: "SDG 13",
			population: data.fundsRaised.sdg13,
			color: sdgColors.sdg13,
			legendFontColor: "#ccc",
			legendFontSize: 11,
		},
		{
			name: "SDG 14",
			population: data.fundsRaised.sdg14,
			color: sdgColors.sdg14,
			legendFontColor: "#ccc",
			legendFontSize: 11,
		},
		{
			name: "SDG 15",
			population: data.fundsRaised.sdg15,
			color: sdgColors.sdg15,
			legendFontColor: "#ccc",
			legendFontSize: 11,
		},
	];

	return (
		<View className="bg-[#242038] rounded-lg shadow-md p-3 flex flex-col items-center justify-center">
			<Text className="text-gray-200 text-lg font-semibold mb-4">
				Funds Raised by SDG (in ₹)
			</Text>

			<PieChart
				data={chartData}
				width={screenWidth}
				height={220}
				chartConfig={{
					backgroundColor: "#242038",
					backgroundGradientFrom: "#242038",
					backgroundGradientTo: "#242038",
					decimalPlaces: 0,
					color: () => `rgba(96, 165, 250, 255)`,
				}}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft="30"
				absolute
			/>
		</View>
	)
}

export default FundsRaised;