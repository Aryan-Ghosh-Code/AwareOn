import { FaAward } from "react-icons/fa6";
import type { TierInfo } from "../../types";

interface TierInfoProps {
	tier: TierInfo;
}

const TierCard = ({ tier }: TierInfoProps) => {
	return (
		<div className="group relative overflow-hidden rounded-2xl bg-[#242038] p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 border border-slate-400">
			<div className="relative z-10 flex flex-col items-center text-center gap-2">
				<div className="relative w-full">
					<div className="w-full h-52 lg:h-64 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 shadow-md overflow-hidden">
						<div className="w-full h-full rounded-lg bg-[#1b1828f6] p-2">
							<img
								src={tier.img}
								alt={tier.tierName}
								className="w-full h-full object-contain object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</div>

					<div className="absolute top-2 right-2 w-7 h-7 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-md flex items-center justify-center">
						<FaAward />
					</div>
				</div>

				<h3 className="text-lg font-bold text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
					{tier.tierName}
				</h3>

				<div className="flex flex-col items-center gap-1 -mt-2">
					<span className="text-gray-400">Points</span>
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-1 rounded-full font-semibold text-sm shadow-md">
						{tier.points}
					</div>
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-2xl"></div>
		</div>
	)
}

export default TierCard;