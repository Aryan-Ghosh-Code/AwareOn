import { Link } from "react-router-dom";
import type { Problem } from "../../types";

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard = ({problem}: ProblemCardProps) => {
	return (
		<Link
			key={problem._id}
			to={`/repository/problem/${problem._id}`}
			className="block bg-[#242038] rounded-xl p-4 hover:bg-[#443850] transition shadow-md hover:scale-105"
		>
			<div className="flex gap-4">
				<img
					src={problem.url}
					alt={problem.problem}
					className="w-32 h-28 object-cover rounded-lg"
				/>
				<div className="flex-1">
					<h3 className="text-lg font-bold text-[#61C9A8] mb-2">
						{problem.problem}
					</h3>
					<p className="text-sm text-gray-300">
						<span className="font-semibold text-[#6290C3]">SDG:</span>
						{problem.SDG.map((sdg: string, index: number) => (
							<span
								key={index}
								className="ml-2 px-2 py-1 bg-[#6290C3] rounded-lg text-xs font-semibold text-[#242038] inline-block"
							>
								{sdg}
							</span>
						))}
					</p>
					<p className="text-sm text-gray-300">
						<span className="font-semibold">Alert Level:</span>{" "}
						<span
							className={
								problem.alertLevel === "high"
									? "text-red-400 font-bold"
									: "text-yellow-400 font-bold"
							}
						>
							{problem.alertLevel}
						</span>
					</p>
					<p className="text-sm text-[#EAD2AC]">
						<span className="font-semibold">Location:</span>{" "}
						{problem.location.address}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default ProblemCard;