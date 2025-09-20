import { FaUser, FaEnvelope, FaExclamationTriangle, FaBullseye, FaCalendarAlt } from "react-icons/fa";
import type { Problem } from "../../types";

interface ProblemProps {
	problem: Problem
}

const ProblemInfo = ({ problem }: ProblemProps) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};
	const isHigh = problem.alertLevel?.toLowerCase() === "high";

	return (
		<>
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-100 mb-2">{problem.problem}</h1>
					<div className="flex items-center gap-2 text-base text-gray-300">
						<FaCalendarAlt className="w-4 h-4" />
						<span>Reported on {formatDate(problem.createdAt)}</span>
					</div>
				</div>

				{/* Owner Card */}
				<div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm">
					<div className="flex items-center gap-3">
						<div className="relative w-12 h-12">
							{problem.owner.profilePic ? (
								<img
									src={problem.owner.profilePic}
									alt={`${problem.owner.name}'s profile`}
									className="w-full h-full rounded-full object-cover border-2 border-indigo-400"
								/>
							) : null}
							<div
								className={`${problem.owner.profilePic ? 'hidden' : 'flex'} w-full h-full bg-indigo-500 rounded-full items-center justify-center border-2 border-indigo-400`}
								style={{ display: problem.owner.profilePic ? 'none' : 'flex' }}
							>
								<FaUser className="w-6 h-6 text-white" />
							</div>
						</div>
						<div>
							<p className="text-white font-semibold text-sm">Reported by</p>
							<p className="text-indigo-300 font-medium">{problem.owner.name}</p>
							<div className="flex items-center gap-1 mt-1">
								<FaEnvelope className="w-3 h-3 text-gray-400" />
								<p className="text-gray-400 text-xs">{problem.owner.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Status and Alert Level Bar */}
			<div className="flex flex-wrap items-center gap-4 p-4 bg-[#242038] rounded-xl border border-gray-700">
				<div className="flex items-center gap-2">
					<FaExclamationTriangle className="w-5 h-5 text-red-400" />
					<span className="font-semibold text-gray-200">Alert Level:</span>
					<span className={`px-3 py-1 rounded-lg text-sm font-bold ${isHigh ? "bg-red-900/40 text-red-400 border border-red-500/40"
						: "bg-yellow-900/40 text-yellow-400 border border-yellow-500/40"
						}`}>
						{problem.alertLevel.toUpperCase()}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<FaBullseye className="w-5 h-5 text-emerald-400" />
					<span className="font-semibold text-gray-200">Confidence:</span>
					<span className="text-emerald-300 font-medium">
						{(problem.confidence * 100).toFixed(1)}%
					</span>
				</div>
			</div>
		</>
	);
};

export default ProblemInfo;
