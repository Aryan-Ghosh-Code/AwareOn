import { ProblemProps } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ProblemCardProps {
	problem: ProblemProps;
}

const ProblemCard = ({ problem }: ProblemCardProps) => {
	const getAlertConfig = (level: string) => {
		switch (level.toLowerCase()) {
			case 'high':
				return {
					color: '#EF4444',
					bgColor: 'rgba(239, 68, 68, 0.1)',
					icon: 'alert-circle'
				};
			case 'medium':
				return {
					color: '#F59E0B',
					bgColor: 'rgba(245, 158, 11, 0.1)',
					icon: 'alert'
				};
			case 'low':
				return {
					color: '#10B981',
					bgColor: 'rgba(16, 185, 129, 0.1)',
					icon: 'information'
				};
			default:
				return {
					color: '#F59E0B',
					bgColor: 'rgba(245, 158, 11, 0.1)',
					icon: 'alert'
				};
		}
	};

	const alertConfig = getAlertConfig(problem.alertLevel);

	return (
		<Link
			asChild
			href={{
				pathname: "/(tabs)/repository/problem/[id]",
				params: { id: problem._id },
			}}
		>
			<TouchableOpacity className="bg-[#242038] active:bg-[#443850] rounded-2xl p-4 shadow-lg">
				<View className="flex-row items-start mb-4 gap-3">
					<View className="w-20 h-20 rounded-xl overflow-hidden mr-4 shadow-md bg-gray-700">
						<Image
							source={{ uri: problem.url }}
							className="w-full h-full"
							resizeMode="cover"
						/>
					</View>

					<View className='flex-col'>
						<Text className="text-xl font-bold text-gray-200 mb-2"
							numberOfLines={2}
						>
							{problem.problem}
						</Text>

						<View
							className="flex-row items-center justify-center p-2 rounded-full"
							style={{ backgroundColor: alertConfig.bgColor }}
						>
							<Icon
								name={alertConfig.icon}
								size={14}
								color={alertConfig.color}
							/>
							<Text
								className="text-xs font-bold uppercase"
								style={{ color: alertConfig.color }}
							>
								{problem.alertLevel} ALERT
							</Text>
						</View>
					</View>
				</View>

				<View className="mb-4">
					<View className="flex-row items-center mb-2 gap-2">
						<Icon name="earth" size={16} color="#6290C3" />
						<Text className="text-sm font-semibold text-[#6290C3] ml-1">
							Sustainable Development Goals
						</Text>
					</View>
					<View className="flex-row flex-wrap gap-2">
						{problem.SDG.map((sdg: string, index: number) => (
							<View
								key={index}
								className="px-2 py-0.5 rounded-lg bg-[#6290C3]"
							>
								<Text className="text-xs font-bold text-white">
									SDG {sdg}
								</Text>
							</View>
						))}
					</View>
				</View>

				<View className="flex-row items-start">
					<Icon name="map-marker" size={16} color="#EAD2AC" />
					<View className="flex-1 ml-2">
						<Text className="text-xs font-semibold text-[#EAD2AC] mb-1">
							LOCATION
						</Text>
						<Text
							className="text-sm text-gray-300"
							numberOfLines={2}
						>
							{problem.location.address}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default ProblemCard;