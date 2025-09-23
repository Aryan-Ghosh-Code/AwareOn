import { Doughnut } from "react-chartjs-2";
import type { ChartProps } from "../../types";
import { chartOptions } from "../../constants/chartOptions";

const ProblemDistribution = ({ data }: ChartProps) => {
	const ministryColors = {
		roadTransport: '#FF6384',
		urbanDevelopment: '#36A2EB',
		trafficPolice: '#FFCE56',
		transport: '#4BC0C0',
		forest: '#9966FF',
		environment: '#FF9F40',
		municipalHealth: '#FF6384',
		publicWorks: '#C9CBCF',
		powerSupply: '#4BC0C0'
	};

	const problemsData = {
		labels: [
			'Road Transport',
			'Urban Development',
			'Traffic Police',
			'Transport',
			'Forest',
			'Environment',
			'Municipal Health',
			'Public Works',
			'Power Supply'
		],
		datasets: [{
			data: [
				data.problemsByMinistry.roadTransport,
				data.problemsByMinistry.urbanDevelopment,
				data.problemsByMinistry.trafficPolice,
				data.problemsByMinistry.transport,
				data.problemsByMinistry.forest,
				data.problemsByMinistry.environment,
				data.problemsByMinistry.municipalHealth,
				data.problemsByMinistry.publicWorks,
				data.problemsByMinistry.powerSupply
			],
			backgroundColor: [
				ministryColors.roadTransport,
				ministryColors.urbanDevelopment,
				ministryColors.trafficPolice,
				ministryColors.transport,
				ministryColors.forest,
				ministryColors.environment,
				ministryColors.municipalHealth,
				ministryColors.publicWorks,
				ministryColors.powerSupply
			],
			borderWidth: 2,
			borderColor: '#ffffff'
		}]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2>Problems Distribution by Ministry</h2>

			<div className="h-80">
				<Doughnut data={problemsData} options={chartOptions} />
			</div>
		</div>
	)
}

export default ProblemDistribution;