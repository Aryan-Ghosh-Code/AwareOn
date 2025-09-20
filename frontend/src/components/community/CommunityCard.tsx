import { Link } from "react-router-dom";
import type { Communities, TierName } from "../../types";
import { FaArrowRight, FaCalendarAlt, FaComments } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { communityColor, communityCover } from "../../constants/community";

interface CommunityProps {
	community: Communities;
}

const CommunityCard = ({ community }: CommunityProps) => {
	return (
		<div
			key={community._id}
			className="bg-[#242038] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group block"
		>
			<div className="h-50 bg-gradient-to-br from-green-400 to-emerald-600 relative">
				<img
					src={`${communityCover[community.tierId.tierName as TierName]}`}
					alt={community.tierId.tierName}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute bottom-4 left-4">
					<span className={`bg-gray-200 bg-opacity-90 ${communityColor[community.tierId.tierName as TierName]} px-3 py-1 rounded-full text-sm md:text-base font-semibold`}>
						{community.tierId.tierName}
					</span>
				</div>
				<div className="absolute bottom-4 right-4">
					<div className="bg-gray-200 bg-opacity-90 rounded-full p-2">
						<FaComments className="text-gray-700 text-lg" />
					</div>
				</div>
			</div>

			<div className="p-4">
				<div className="mb-4">
					<div className="flex flex-col md:flex-row gap-1 items-start md:items-center justify-between mb-3">
						<h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
							<MdGroup className="text-gray-400 text-xl" />
							Members: {community.members.length}
						</h3>

						<h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
							<FaCalendarAlt className="text-gray-400 text-lg" />
							Created: {new Date(community.createdAt).toLocaleString("en-IN").split(", ")[0]}
						</h3>
					</div>
				</div>

				<Link
					to={`/community/${community._id}`}
					className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3"
				>
					Go to Chat
					<FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</div>
	)
}

export default CommunityCard;