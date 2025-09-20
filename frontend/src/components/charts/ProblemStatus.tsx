import { Bar } from "react-chartjs-2";
import type { ChartProps } from "../../types";
import { stackedBarOptions } from "../../constants/chartOptions";

const ProblemStatus = ({ data }: ChartProps) => {
	const problemStatusData = {
		labels: ['Pending', 'Ongoing', 'Resolved'],
		datasets: [
			{
				label: 'Problems',
				data: [
					data.problemStatus.pending,
					data.problemStatus.ongoing,
					data.problemStatus.resolved
				],
				backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
				borderRadius: 6,
				borderSkipped: false
			}
		]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2>Problem Status Overview</h2>

			<div className="h-80">
				<Bar data={problemStatusData} options={stackedBarOptions} />
			</div>
		</div>
	)
}

export default ProblemStatus;