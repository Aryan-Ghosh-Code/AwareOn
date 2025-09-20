import { ProblemProps } from '@/interfaces/interfaces';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ProblemInfoProps {
	problem: ProblemProps;
}

const ProblemInfo = ({ problem }: ProblemInfoProps) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-IN', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const isHigh = problem.alertLevel?.toLowerCase() === "high";

	return (
		<View className="flex-col gap-6 mb-6 w-full">
			<View className="flex-col gap-4">
				<View>
					<Text className="text-3xl font-bold text-gray-100 mb-2">
						{problem.problem}
					</Text>
					<View className="flex-row items-center gap-2">
						<Icon name="calendar-alt" size={14} color="#d1d5db" />
						<Text className="text-base text-gray-300">
							Reported on {formatDate(problem.createdAt)}
						</Text>
					</View>
				</View>

				<View className="border rounded-xl p-4"
					style={{
						backgroundColor: "#4f46e5",
						borderColor: "#818cf8"
					}}
				>
					<View className="flex-row items-center gap-3">
						<View className="relative w-20 h-20">
							{problem.owner?.profilePic ? (
								<Image
									source={{ uri: problem.owner.profilePic }}
									className="w-full h-full rounded-full border-2"
									resizeMode='cover'
									style={{
										backgroundColor: "#6366f1",
										borderColor: "#818cf8"
									}}
								/>
							) : (
								<View className="w-20 h-20 rounded-full items-center justify-center border-2"
									style={{
										backgroundColor: "#4f46e5",
										borderColor: "#818cf8"
									}}
								>
									<Icon name="user" size={30} color="#fff" />
								</View>
							)}
						</View>
						<View>
							<Text className="text-white font-semibold text-sm">
								Reported by
							</Text>
							<Text className="text-indigo-300 font-medium">
								{problem.owner?.name}
							</Text>
							<View className="flex-row items-center gap-1 mt-1">
								<Icon name="envelope" size={10} color="#9ca3af" />
								<Text className="text-gray-400 text-xs">
									{problem.owner?.email}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			<View className="flex-row flex-wrap items-center gap-4 p-4 bg-[#242038] rounded-xl border border-gray-700">
				<View className="flex-row items-center gap-2">
					<Icon name="exclamation-triangle" size={18} color="#f87171" />
					<Text className="font-semibold text-gray-200">Alert Level:</Text>
					<Text
						className={`px-3 py-1 rounded-lg text-sm font-bold border ${isHigh
							? "bg-red-900/40 text-red-400 border-red-500/40"
							: "bg-yellow-900/40 text-yellow-400 border-yellow-500/40"
							}`}
					>
						{problem.alertLevel.toUpperCase()}{" "}
					</Text>
				</View>

				<View className="flex-row items-center gap-2">
					<Icon name="bullseye" size={18} color="#34d399" />
					<Text className="font-semibold text-gray-200">Confidence:</Text>
					<Text className="text-emerald-300 font-medium">
						{(problem.confidence * 100).toFixed(1)}%
					</Text>
				</View>
			</View>
		</View>
	)
}

export default ProblemInfo;