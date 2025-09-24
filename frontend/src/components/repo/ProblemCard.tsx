import { Link } from "react-router-dom";
import type { Problem } from "../../types";
import { PiArrowFatUpFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useState } from "react";
import useUpvoteIssue from "../../hooks/useUpvoteIssue";

interface ProblemCardProps {
	problem: Problem;
}

const ProblemCard = ({ problem }: ProblemCardProps) => {
	const [upvotes, setUpvotes] = useState<number>(problem.upvotes);
	const { loading, upvote } = useUpvoteIssue();

	const upvoteIssue = async () => {
		const data = await upvote(problem._id);
		setUpvotes(data);
	}

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
					<div className="flex items-center gap-1 mb-2">
						<h3 className="text-lg font-bold text-[#61C9A8]">
							{problem.problem}
						</h3>
						{problem.problemStatus === "verified" && (
							<RiVerifiedBadgeFill className="text-xl text-green-400" />
						)}
					</div>
					<p className="text-sm text-gray-300">
						<span className="font-semibold text-[#6290C3]">SDG:</span>
						<span

							className="ml-2 px-2 py-1 bg-[#6290C3] rounded-lg text-xs font-semibold text-[#242038] inline-block"
						>
							{problem.ministry}
						</span>
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
					<button
						className="flex items-center gap-1 mt-1 border-none outline-none cursor-pointer"
						disabled={loading}
						onClick={upvoteIssue}
					>
						<PiArrowFatUpFill className="text-blue-300 text-xl hover:text-blue-400" />
						<span className="font-semibold text-base text-gray-400">{upvotes}</span>
					</button>
				</div>
			</div>
		</Link>
	)
}

export default ProblemCard;