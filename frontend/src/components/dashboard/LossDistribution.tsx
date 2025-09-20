import { Doughnut } from "react-chartjs-2";
import { lossDistDoughnutChartOptions } from "../../constants/chartOptions";
import type { StateDataProps } from "../../types";

const LossDistribution = ({ stateData }: StateDataProps) => {
	const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];

	console.log(stateData)

	const doughnutChartData = {
		labels: stateData.map(item => item.state),
		datasets: [{
			data: stateData.map(item => item.loss_ha),
			backgroundColor: colors,
			borderColor: '#1F2937',
			borderWidth: 2,
		}]
	};

	return (
		<div className="bg-[#242038] rounded-lg p-4">
			<h3 className="text-gray-200 text-lg font-bold mb-4">📉 Loss Distribution</h3>
			<div className="h-64">
				<Doughnut data={doughnutChartData} options={lossDistDoughnutChartOptions} />
			</div>
		</div>
	)
}

export default LossDistribution;