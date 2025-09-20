import { Bar } from "react-chartjs-2";
import { barOptions, sdgColors } from "../../constants/chartOptions";
import type { ChartProps } from "../../types";

const FundsRaised = ({ data }: ChartProps) => {
	const fundsData = {
		labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
		datasets: [{
			label: 'Funds Raised (₹)',
			data: [data.fundsRaised.sdg13, data.fundsRaised.sdg14, data.fundsRaised.sdg15],
			backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
			borderRadius: 8,
			borderSkipped: false
		}]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2>Funds Raised by SDG</h2>
			
			<div className="h-80">
				<Bar data={fundsData} options={barOptions} />
			</div>
		</div>
	)
}

export default FundsRaised;