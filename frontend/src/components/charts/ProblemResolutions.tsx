import { Bar } from "react-chartjs-2";
import type { ChartProps } from "../../types"
import { barOptions } from "../../constants/chartOptions";

const ProblemResolutions = ({ data }: ChartProps) => {
	const resolutionData = {
		labels: ['User Reports', 'Government Reports'],
		datasets: [{
			label: 'Resolved Problems',
			data: [data.resolvedComparison.byUsers, data.resolvedComparison.byGovt],
			backgroundColor: ['#FF9F43', '#6C5CE7'],
			borderRadius: 6,
			borderSkipped: false
		}]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2>Resolution Reporting Comparison</h2>

			<div className="h-80">
				<Bar data={resolutionData} options={barOptions} />
			</div>
		</div>
	)
}

export default ProblemResolutions;