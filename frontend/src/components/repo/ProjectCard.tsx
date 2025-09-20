import { Link } from "react-router-dom";
import type { Project } from "../../types";

interface ProjectCardProps {
	project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	return (
		<Link
			key={project._id}
			to={`/repository/project/${project._id}`}
			className="block bg-[#242038] rounded-xl p-4 hover:bg-[#443850] transition shadow-md hover:scale-105"
		>
			<div className="flex gap-4">
				<div className="flex-1 gap-0.5">
					<h3 className="text-lg font-bold text-[#61C9A8] mb-2">
						{project.name}
					</h3>
					<p className="text-sm text-gray-300">
						<span className="font-semibold text-[#6290C3]">SDG:</span>{" "}
						{project.SDG.map((sdg: string, index: number) => (
							<span
								key={index}
								className="ml-2 px-2 py-1 bg-[#6290C3] rounded-lg text-xs font-semibold text-[#242038] inline-block"
							>
								{sdg}
							</span>
						))}
					</p>
					<p className="text-sm text-gray-300 flex items-center gap-1 mb-0.5">
						<span className="font-semibold">Owner:</span> {project.owner.name}
					</p>
					<p className="text-sm text-gray-300 flex items-center gap-1">
						<span className="font-semibold">Stakeholder:</span><span className="ml-1 px-2 py-1 bg-slate-800 border border-gray-300 rounded-lg text-xs font-semibold text-gray-300 inline-block">{project.ownerModel}</span>
					</p>
					<p className="text-sm text-[#B76D68]">
						<span className="font-semibold">Aim:</span> {project.aim}
					</p>
					<p className="text-sm text-[#EAD2AC]">
						<span className="font-semibold">Location:</span>{" "}
						{`${project.location.city}, ${project.location.state}`}
					</p>
				</div>
				{/* 💰 Funding Highlight */}
				<div className="text-right">
					<span className="text-gray-400">Target</span>
					<p className="text-xl font-bold text-green-400">
						₹ {project.target}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default ProjectCard;