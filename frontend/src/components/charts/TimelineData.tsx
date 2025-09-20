import { Line } from "react-chartjs-2";
import type { ChartProps } from "../../types";
import { lineOptions } from "../../constants/chartOptions";

const TimelineData = ({ data }: ChartProps) => {
	const timelineData = {
		labels: [
			"1 Hour Ago",
			"6 Hours Ago",
			"12 Hours Ago",
			"1 Day Ago",
			"3 Days Ago",
			"7 Days Ago",
			"30 Days Ago"
		],
		datasets: [
			{
				label: "Problems Reported",
				data: [
					data.reportedProblems.oneHour,
					data.reportedProblems.sixHours,
					data.reportedProblems.twelveHours,
					data.reportedProblems.oneDay,
					data.reportedProblems.threeDays,
					data.reportedProblems.sevenDays,
					data.reportedProblems.thirtyDays
				],
				borderColor: "#FF6B6B",
				backgroundColor: "rgba(255,107,107,0.3)",
				tension: 0.4,
				fill: true,
				pointBackgroundColor: "#FF6B6B",
				pointBorderColor: "#fff",
				pointRadius: 6
			}
		]
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
			<h2>Reported Problems Timeline</h2>

			<div className="h-96">
				<Line data={timelineData} options={lineOptions} />
			</div>
		</div>
	)
}

export default TimelineData;