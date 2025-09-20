import { useState } from "react";
import { dataset } from "../../constants/GFWDataset";
import DashboardStats from "../../components/dashboard/DashboardStats";
import AppNavbar from "../../components/navbars/AppNavbar";
import DashboardHotspots from "../../components/dashboard/DashboardHotspots";
import StatesForestLoss from "../../components/charts/StatesForestLoss";
import LossDistribution from "../../components/dashboard/LossDistribution";
import CriticalAlert from "../../components/dashboard/CriticalAlert";

const Dashboard = () => {
	const [selectedView, setSelectedView] = useState<'heatmap' | 'markers'>('heatmap');
	const [selectedState, setSelectedState] = useState<string | null>(null);

	// Aggregating data by state for charts
	const stateData = dataset.reduce((acc, row) => {
		const existing = acc.find(item => item.state === row.state);
		if (existing) {
			existing.loss_ha += row.loss_ha;
		} else {
			acc.push({ state: row.state, loss_ha: row.loss_ha });
		}
		return acc;
	}, [] as { state: string; loss_ha: number }[])
		.sort((a, b) => b.loss_ha - a.loss_ha)
		.slice(0, 10);

	const totalLoss = dataset.reduce((sum, row) => sum + row.loss_ha, 0);
	const avgLoss = totalLoss / dataset.length;
	const maxLoss = Math.max(...dataset.map(row => row.loss_ha));

	return (
		<>
			<AppNavbar />

			<div className="flex flex-col min-h-screen">
				<div className="flex-1 px-8 md:px-16 pt-20 mx-auto pb-6 w-full">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center justify-center w-full gap-2">
						<h1 className="text-3xl font-bold text-gray-100 text-center">
							Global Forest Watch - India Deforestation Dashboard 2024
						</h1>
						<p className="text-gray-300 text-lg italic  text-center">
							Real-time monitoring of forest loss hotspots across Indian states
						</p>
					</div>

					{/* Stats Overview */}
					<DashboardStats
						totalLoss={totalLoss}
						avgLoss={avgLoss}
						maxLoss={maxLoss}
					/>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
						{/* Map Section */}
						<DashboardHotspots
							maxLoss={maxLoss}
							selectedView={selectedView}
							setSelectedView={setSelectedView}
							setSelectedState={setSelectedState}
						/>

						{/* Charts Section */}
						<div className="space-y-6">
							{/* Selected State Info */}
							{selectedState && (
								<div className="bg-[#242038] rounded-lg p-4 border-l-4 border-blue-500">
									<h3 className="text-gray-200 text-lg font-bold mb-2">
										📍 Selected State
									</h3>
									<p className="text-blue-400 font-medium text-lg">{selectedState}</p>
									<p className="text-base text-gray-400 mt-1">
										Total Loss:{" "}
										{dataset
											.filter((item) => item.state === selectedState)
											.reduce((sum, item) => sum + item.loss_ha, 0)
											.toFixed(1)}{" "}
										ha
									</p>
								</div>
							)}

							<StatesForestLoss
								stateData={stateData}
							/>

							<LossDistribution
								stateData={stateData}
							/>

							{/* Alert Box */}
							<CriticalAlert
								stateData={stateData}
							/>
						</div>
					</div>
				</div>

				{/* Footer */}
				<footer className="bg-slate-900 p-4">
					<p className="text-center text-gray-400 text-sm">
						Data Source: Global Forest Watch | Last Updated: 2024
					</p>
				</footer>
			</div>
		</>
	);
};

export default Dashboard;