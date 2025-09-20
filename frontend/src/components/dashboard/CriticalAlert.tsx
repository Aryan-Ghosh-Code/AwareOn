import type { StateDataProps } from "../../types"

const CriticalAlert = ({ stateData }: StateDataProps) => {
	return (
		<div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
			<h3 className="text-red-400 font-bold mb-2 text-lg">🚨 Critical Alert</h3>
			<p className="text text-red-200">
				{stateData[0]?.state} shows the highest deforestation rate with {stateData[0]?.loss_ha.toFixed(1)} ha lost.
			</p>
		</div>
	)
}

export default CriticalAlert;