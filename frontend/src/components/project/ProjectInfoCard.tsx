import {
	FaUser,
	FaEnvelope,
	FaBuilding,
	FaHandsHelping,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaRupeeSign
} from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import { SiUnitednations } from "react-icons/si";
import type { Project } from '../../types';

interface ProjectInfoProps {
	project: Project;
}

const ProjectInfoCard = ({ project }: ProjectInfoProps) => {
	const fundingPercentage = project.target ? (project.fundRaised / project.target) * 100 : 0;

	const getOwnerImage = () => {
		if (project.owner.profilePic) {
			return project.owner.profilePic;
		}

		return project.ownerModel === 'NGO'
			? '/NGO.png'
			: '/Govt.png';
	};

	return (
		<div className="bg-gray-800/60 rounded-2xl shadow-lg p-6 mb-8 space-y-3">
			<h1 className="text-3xl font-bold text-white mb-8">{project.name}</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{/* Owner Details Card */}
				<div className="bg-[#242038] rounded-2xl shadow-lg p-6 space-y-4">
					<h2 className="text-xl font-semibold text-white mb-4 flex items-center">
						<FaUser className="mr-2 text-[#6290C3]" />
						Owner Details
					</h2>

					<div className="flex flex-col items-center space-y-3">
						<div className="relative">
							<img
								src={getOwnerImage()}
								alt={project.owner.name}
								className="w-20 h-20 rounded-full object-cover border-3 border-[#6290C3]"
							/>
							<div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${project.ownerModel === 'NGO' ? 'bg-green-500' : 'bg-blue-500'
								}`}>
								{project.ownerModel === 'NGO' ? <FaHandsHelping /> : <FaBuilding />}
							</div>
						</div>

						<div className="text-center space-y-2">
							<h3 className="text-lg font-semibold text-white">{project.owner.name}</h3>
							<p className="text-sm text-gray-400 flex items-center justify-center">
								<FaEnvelope className="mr-2" />
								{project.owner.email}
							</p>
							<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.ownerModel === 'NGO'
								? 'bg-green-100 text-green-800'
								: 'bg-blue-100 text-blue-800'
								}`}>
								{project.ownerModel}
							</span>
						</div>
					</div>
				</div>

				{/* Funding Progress Card */}
				<div className="lg:col-span-2 bg-[#242038] rounded-2xl shadow-lg p-6">
					<h2 className="text-xl font-semibold text-white mb-6 flex items-center">
						<FiTarget className="mr-2 text-green-400" />
						Funding Progress
					</h2>

					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<div className="text-center">
								<p className="text-sm text-gray-400">Target Amount</p>
								<p className="text-2xl font-bold text-green-400 flex items-center justify-center">
									<FaRupeeSign className="text-lg mr-1" />
									{project.target?.toLocaleString("en-IN") || '0'}
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm text-gray-400">Raised So Far</p>
								<p className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
									<FaRupeeSign className="text-lg mr-1" />
									{project.fundRaised?.toLocaleString("en-IN") || '0'}
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm text-gray-400">Progress</p>
								<p className="text-2xl font-bold text-blue-400">
									{fundingPercentage.toFixed(2)}%
								</p>
							</div>
						</div>

						{/* Progress Bar */}
						<div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full transition-all duration-500 ease-out"
								style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
							>
								<div className="h-full bg-gradient-to-r from-transparent to-white/20"></div>
							</div>
						</div>

						<div className="text-center">
							<p className="text-sm text-gray-400">
								Remaining: <span className="text-red-400 font-semibold">
									₹{Math.max(0, (project.target || 0) - (project.fundRaised || 0)).toLocaleString("en-IN")}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-[#242038] rounded-2xl shadow-lg p-6 mb-8 space-y-3">
				<p className="text-gray-300 flex items-center">
					<span className="font-semibold text-[#6290C3] flex items-center mr-3">
						<SiUnitednations className="mr-2" />
						SDG:
					</span>
					{project.SDG.join(", ")}
				</p>
				<p className="text-gray-300 flex items-start">
					<span className="font-semibold text-red-600 flex items-center mr-3">
						<FiTarget className="mr-2" />
						Aim:
					</span>
					<span className="flex-1">{project.aim}</span>
				</p>
				<p className="text-gray-300 flex items-center">
					<span className="font-semibold text-orange-200 flex items-center mr-3">
						<FaMapMarkerAlt className="mr-2" />
						Location:
					</span>
					{`${project.location.city}, ${project.location.state}`}
				</p>
				<p className="text-gray-300 flex items-center">
					<span className="font-semibold text-purple-300 flex items-center mr-3">
						<FaCalendarAlt className="mr-2" />
						Timeline:
					</span>
					{project.timeline.startDate} → {project.timeline.endDate}
				</p>
			</div>

			<div className="bg-[#242038] rounded-2xl shadow-lg p-6 mb-8">
				<h2 className="text-xl font-semibold text-white mb-4">Description</h2>
				<p className="text-gray-300 leading-relaxed">{project.description}</p>
			</div>

			<div className="bg-[#242038] rounded-2xl shadow-lg p-6">
				<h2 className="text-xl font-semibold text-white mb-4">Objectives</h2>
				<ul className="space-y-2">
					{project.objectives.map((objective, index) => (
						<li key={index} className="text-gray-300 flex items-start">
							<span className="text-green-400 mr-2">•</span>
							{objective}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProjectInfoCard;