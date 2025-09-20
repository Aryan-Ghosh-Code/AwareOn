import { StateDataProps } from '@/interfaces/interfaces';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const LossDistribution = ({ stateData }: StateDataProps) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];
  const screenWidth = Dimensions.get("window").width - 48;
  const chartData = stateData.map((item, index) => ({
    name: item.abbreviation,
    population: item.loss_ha,
    color: colors[index % colors.length],
    legendFontColor: "#ccc",
    legendFontSize: 11,
  }));

  return (
    <View className="bg-[#242038] rounded-2xl p-4 flex flex-col items-center justify-center">
      <Text className="text-gray-200 text-lg font-semibold mb-4">
        📉 Loss Distribution
      </Text>

      <PieChart
        data={chartData}
        width={screenWidth}
        height={260}
        chartConfig={{
          backgroundColor: "#242038",
          backgroundGradientFrom: "#242038",
          backgroundGradientTo: "#242038",
          color: () => `rgba(96, 165, 250, 255)`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="48"
        absolute
      />
    </View>
  )
}

export default LossDistribution;