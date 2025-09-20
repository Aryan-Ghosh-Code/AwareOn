import { BiMapPin } from "react-icons/bi";
import { FaLeaf } from "react-icons/fa";
import MapAtCoords from "../maps/MapAtCoords";
import type { Problem } from "../../types";

interface ProblemProps {
	problem: Problem;
}

const ProblemContent = ({ problem }: ProblemProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			{/* Left: Image + SDG Info */}
			<div className="rounded-2xl overflow-hidden shadow-lg bg-[#242038] border border-gray-700">
				<div className="relative">
					<img
						src={problem.url}
						alt={problem.problem}
						className="w-full h-72 lg:h-full object-cover"
					/>
				</div>

				<div className="p-6 space-y-4">
					{/* SDGs */}
					<div>
						<div className="flex items-center gap-2 mb-3">
							<FaLeaf className="w-5 h-5 text-emerald-400" />
							<p className="text-lg font-semibold text-gray-200">SDGs Targeted</p>
						</div>
						<div className="flex flex-wrap gap-2">
							{problem.SDG.map((sdg: string) => (
								<div key={sdg} className="group">
									<span className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium hover:bg-emerald-600/30 transition-colors cursor-pointer">
										SDG {sdg}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Right: Map + Location */}
			<div className="rounded-2xl overflow-hidden shadow-lg bg-[#242038] border border-gray-700 p-6 flex flex-col">
				<div className="flex items-center gap-2 mb-4">
					<BiMapPin className="w-5 h-5 text-blue-400" />
					<h3 className="text-lg font-semibold text-gray-200">Location Details</h3>
				</div>

				<div className="flex-1 mb-4">
					<MapAtCoords
						lat={problem.location.lat}
						lon={problem.location.lon}
						height={280}
						zoom={16}
					/>
				</div>

				<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
					<p className="text-gray-300 text-sm leading-relaxed">
						<span className="font-semibold text-blue-300">Address:</span><br />
						{problem.location?.address}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ProblemContent;