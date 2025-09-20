import { FiAlertTriangle } from "react-icons/fi";

interface ActionableInsightsProps {
	actionableInsights: string[];
}

const ActionableInsights = ({actionableInsights}: ActionableInsightsProps) => {
	return (
		<section className="rounded-2xl bg-[#242038] border border-gray-700 p-6 shadow-lg">
			<div className="flex items-center gap-3 mb-6">
				<div className="bg-orange-500 rounded-lg p-2">
					<FiAlertTriangle className="w-6 h-6 text-white" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-100">
					Actionable Insights & Recommendations
				</h2>
			</div>

			<div className="grid gap-4">
				{actionableInsights.map((tip, idx) => (
					<div key={idx} className="flex gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-600 hover:border-orange-500/40 transition-colors">
						<div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/40">
							<span className="text-orange-400 text-sm font-bold">{idx + 1}</span>
						</div>
						<p className="text-gray-200 leading-relaxed">{tip}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default ActionableInsights;