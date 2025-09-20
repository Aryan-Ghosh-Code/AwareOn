import { Doughnut } from "react-chartjs-2";
import type { ChartProps } from "../../types";
import { chartOptions, sdgColors } from "../../constants/chartOptions";

const ProblemDistribution = ({ data }: ChartProps) => {
	const problemsData = {
		labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
		datasets: [{
			data: [data.problemsBySDG.sdg13, data.problemsBySDG.sdg14, data.problemsBySDG.sdg15],
			backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
			borderWidth: 2,
			borderColor: '#ffffff'
		}]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2>Problems Distribution by SDG</h2>

			<div className="h-80">
				<Doughnut data={problemsData} options={chartOptions} />
			</div>
		</div>
	)
}

export default ProblemDistribution;