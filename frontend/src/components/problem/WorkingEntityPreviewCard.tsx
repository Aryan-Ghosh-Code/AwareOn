import type { WorkingEntityPreview } from "../../types";

interface WorkingEntityPreviewProps {
	entity: WorkingEntityPreview;
	idx: number;
	defaultImage: string;
}

const WorkingEntityPreviewCard = ({ entity, idx, defaultImage }: WorkingEntityPreviewProps) => {
	return (
		<div className="bg-[#242038] hover:bg-gray-900/60 transition p-4 cursor-pointer">
			<div className="flex items-center gap-3" key={idx}>
				{/* Profile Image */}
				<div className="relative w-12 h-12">
					<img
						src={entity.profilePic || defaultImage}
						alt={`${entity.name}'s profile`}
						className="w-full h-full rounded-full object-cover border-2 border-indigo-400"
					/>
				</div>

				{/* Name + Email */}
				<div>
					<p className="text-indigo-300 font-medium">{entity.name}</p>
					<div className="flex items-center gap-1 mt-1">
						<p className="text-gray-400 text-xs">{entity.email}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkingEntityPreviewCard;