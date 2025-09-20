import { dataset } from "../../constants/GFWDataset";

interface DashboardStatsProps {
	totalLoss: number;
	avgLoss: number;
	maxLoss: number;
}

const DashboardStats = ({ totalLoss, avgLoss, maxLoss }: DashboardStatsProps) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
			<div className="bg-[#242038] rounded-lg p-4 border-l-4 border-red-500">
				<h3 className="text-sm font-medium text-gray-400">Total Forest Loss</h3>
				<p className="text-2xl font-bold text-red-400">{totalLoss.toFixed(2)} ha</p>
			</div>
			<div className="bg-[#242038] rounded-lg p-4 border-l-4 border-orange-500">
				<h3 className="text-sm font-medium text-gray-400">Average Loss</h3>
				<p className="text-2xl font-bold text-orange-400">{avgLoss.toFixed(2)} ha</p>
			</div>
			<div className="bg-[#242038] rounded-lg p-4 border-l-4 border-yellow-500">
				<h3 className="text-sm font-medium text-gray-400">Hotspots Detected</h3>
				<p className="text-2xl font-bold text-yellow-400">{dataset.length}</p>
			</div>
			<div className="bg-[#242038] rounded-lg p-4 border-l-4 border-green-500">
				<h3 className="text-sm font-medium text-gray-400">Max Single Loss</h3>
				<p className="text-2xl font-bold text-green-400">{maxLoss.toFixed(2)} ha</p>
			</div>
		</div>
	)
}

export default DashboardStats;