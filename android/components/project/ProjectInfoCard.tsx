import { images } from '@/constants/images';
import { ProjectProps } from '@/interfaces/interfaces';
import { View, Text, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

interface ProjectInfoProps {
	project: ProjectProps;
}

const ProjectInfoCard = ({ project }: ProjectInfoProps) => {
	const fundingPercentage = project.target ? (project.fundRaised / project.target) * 100 : 0;

	const getOwnerImage = () => {
		if (project.owner.profilePic) {
			return project.owner.profilePic;
		}

		return project.ownerModel === 'NGO'
			? images.NGO
			: images.Govt;
	};

	return (
		<View className="bg-gray-800/60 rounded-2xl shadow-lg p-4 mb-4 space-y-3">
			<Text className="text-3xl font-bold text-white mb-4">{project.name}</Text>

			<View className="grid grid-cols-1 gap-6">
				{/* Owner Details Card */}
				<View className="bg-[#242038] rounded-2xl shadow-lg p-4 space-y-4">
					<View className="mb-4 flex-row gap-2 items-center justify-center">
						<Icon name="user" size={20} color="#6290C3" />
						<Text className='text-lg font-semibold text-white'>Owner Details</Text>
					</View>

					<View className="flex flex-col items-center gap-3">
						<View className="relative">
							<Image
								source={getOwnerImage()}
								resizeMode="cover"
								className="w-20 h-20 rounded-full border-[#6290C3]"
								style={{ borderWidth: 3 }}
							/>
							<View className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${project.ownerModel === 'NGO' ? 'bg-green-500' : 'bg-blue-500'
								}`}>
								{project.ownerModel === 'NGO' ? <Icon name="hands-helping" size={10} color="#fff" /> : <Icon name="building" size={10} color="#fff" />}
							</View>
						</View>

						<View className="flex-col items-center justify-center gap-2">
							<Text className="text-lg font-semibold text-white">{project.owner.name}</Text>
							<View className="flex-row items-center justify-center gap-2">
								<Icon name="envelope" size={15} color="#9CA3AF" />
								<Text className='text-sm text-gray-400'>{project.owner.email}</Text>
							</View>
							<Text className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.ownerModel === 'NGO'
								? 'bg-green-100 text-green-800'
								: 'bg-blue-100 text-blue-800'
								}`}>
								{project.ownerModel}
							</Text>
						</View>
					</View>
				</View>

				{/* Funding Progress Card */}
				<View className="bg-[#242038] rounded-2xl shadow-lg p-4">
					<View className="mb-4 flex-row gap-2 items-center justify-center">
						<Icon name="bullseye" size={20} color="#4ADE80" />
						<Text className='text-lg font-semibold text-white'>Funding Progress</Text>
					</View>

					<View className="flex-col items-center justify-center gap-4">
						<View className="flex-col items-center justify-center gap-2">
							<View className="items-center">
								<Text className="text-sm text-gray-400">Target Amount</Text>
								<Text className="text-2xl font-bold text-green-400">
									₹ {project.target?.toLocaleString("en-IN") || '0'}
								</Text>
							</View>

							<View className="items-center">
								<Text className="text-sm text-gray-400">Raised So Far</Text>
								<Text className="text-2xl font-bold text-yellow-400">
									₹ {project.fundRaised?.toLocaleString("en-IN") || '0'}
								</Text>
							</View>

							<View className="items-center">
								<Text className="text-sm text-gray-400">Progress</Text>
								<Text className="text-2xl font-bold text-blue-400">
									{fundingPercentage.toFixed(2)}%
								</Text>
							</View>
						</View>

						{/* Progress Bar */}
						<View className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
							<View
								className="h-full bg-green-500 rounded-full"
								style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
							/>
						</View>

						<View className="items-center">
							<Text className="text-sm text-gray-400">
								Remaining:{" "}
								<Text className="text-red-400 font-semibold">
									₹ {Math.max(0, (project.target || 0) - (project.fundRaised || 0)).toLocaleString("en-IN")}
								</Text>
							</Text>
						</View>
					</View>
				</View>

				<View className="bg-[#242038] rounded-2xl shadow-lg p-4 flex-col gap-2">
					<View className="flex-row items-center">
						<MCIcon name="account-group" size={15} color="#6290C3" />
						<Text className="ml-2 font-semibold text-[#6290C3]">SDG:</Text>
						<Text className="ml-2 text-gray-300">{project.SDG.join(", ")}</Text>
					</View>

					<View className="flex-row items-start">
						<Icon name="bullseye" size={15} color="#DC2626" />
						<Text className="ml-2 font-semibold text-red-600">Aim:</Text>
						<Text className="ml-2 flex-1 text-gray-300">{project.aim}</Text>
					</View>

					<View className="flex-row items-center">
						<Icon name="map-marker-alt" size={15} color="#FED7AA" />
						<Text className="ml-2 font-semibold text-orange-200">Location:</Text>
						<Text className="ml-2 text-gray-300">
							{`${project.location.city}, ${project.location.state}`}
						</Text>
					</View>

					<View className="flex-row flex-wrap items-center">
						<Icon name="calendar-alt" size={15} color="#D8B4FE" />
						<Text className="ml-2 font-semibold text-purple-300">Timeline:</Text>
						<Text className="ml-2 text-gray-300">
							{project.timeline.startDate} → {project.timeline.endDate}
						</Text>
					</View>
				</View>

				<View className="bg-[#242038] rounded-2xl shadow-lg p-4">
					<Text className="text-xl font-semibold text-white mb-4">Description</Text>
					<Text className="text-gray-300 leading-relaxed">{project.description}</Text>
				</View>

				<View className="bg-[#242038] rounded-2xl shadow-lg p-4">
					<Text className="text-xl font-semibold text-white mb-4">Objectives</Text>

					{project.objectives.map((objective, index) => (
						<View key={index} className="flex-row items-start mb-2">
							<Text className="text-green-400 mr-2">•</Text>
							<Text className="text-gray-300 flex-1">{objective}</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	)
}

export default ProjectInfoCard;