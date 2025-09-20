import { ProjectProps } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

interface ProjectCardProps {
	project: ProjectProps;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	return (
		<Link
			asChild
			className="block bg-[#242038] rounded-xl p-4 active:bg-[#443850]"
			href={{
				pathname: "/(tabs)/repository/project/[id]",
				params: { id: project._id },
			}}
		>
			<TouchableOpacity className="flex-row gap-4">
				<View className="flex gap-0.5">
					<Text className="text-xl font-bold text-[#61C9A8] mb-2">
						{project.name}
					</Text>
					<View className="flex-row items-center">
						<Text className="font-semibold text-[#6290C3]">SDG: </Text>
						<View className="flex-row flex-wrap gap-2">
							{project.SDG.map((sdg: string, index: number) => (
								<View
									key={index}
									className="px-2 py-0.5 bg-[#6290C3] rounded-lg"
								>
									<Text className="text-xs font-semibold text-[#242038]">{sdg}</Text>
								</View>
							))}
						</View>
					</View>
					<Text className="text-sm text-gray-300 flex items-center gap-1 mb-0.5">
						<Text className="font-semibold">Owner: </Text> {project.owner.name}
					</Text>
					<View className=" flex-row items-center">
						<Text className="font-semibold text-sm text-gray-300">Stakeholder: </Text>
						<View className="px-2 py-0.5 bg-slate-800 border border-gray-300 rounded-lg">
							<Text className='text-xs font-semibold text-gray-300 inline-block'>{project.ownerModel}</Text>
						</View>
					</View>
					<Text className="text-sm text-[#B76D68]">
						<Text className="font-semibold">Aim:</Text> {project.aim}
					</Text>
					<Text className="text-sm text-[#EAD2AC]">
						<Text className="font-semibold">Location: </Text>{" "}
						{`${project.location.city}, ${project.location.state}`}
					</Text>
				</View>
				<View className="text-right">
					<Text className="text-gray-400 text-right">Target</Text>
					<Text className="text-xl font-bold text-green-400 text-right">
						₹ {project.target}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
}

export default ProjectCard;