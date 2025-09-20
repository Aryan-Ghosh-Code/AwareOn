import { Bar } from "react-chartjs-2";
import { statesForestLossBarChartOptions } from "../../constants/chartOptions";
import type { StateDataProps } from "../../types";

const StatesForestLoss = ({ stateData }: StateDataProps) => {
	const barChartData = {
		labels: stateData.map(item => item.state),
		datasets: [{
			label: 'Forest Loss (ha)',
			data: stateData.map(item => item.loss_ha),
			backgroundColor: '#EF4444',
			borderColor: '#DC2626',
			borderWidth: 1,
			borderRadius: 4,
			borderSkipped: false,
		}]
	};

	return (
		<div className="bg-[#242038] rounded-lg p-4">
			<h3 className="text-gray-200 text-lg font-bold mb-4">📊 Top States by Forest Loss</h3>
			<div className="h-64">
				<Bar data={barChartData} options={statesForestLossBarChartOptions} />
			</div>
		</div>
	)
}

export default StatesForestLoss;