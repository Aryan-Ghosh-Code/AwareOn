import { ReportPreview } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

interface ReportPreviewProps {
	report: ReportPreview;
}

const ReportPreviewCard = ({ report }: ReportPreviewProps) => {
	return (
		<Link
			href={{
				pathname: "/(tabs)/report/[id]",
				params: { id: report._id },
			}}
			asChild
		>
			<View className="bg-[#242038] px-4 py-3 flex-row items-center justify-between rounded-md active:bg-gray-900/60 gap-4">
				<View className="flex-col gap-1.5 flex-shrink">
					<View className="flex-row items-center gap-2">
						<Text className="text-sm text-gray-400">Report</Text>

						<View
							className={`px-2 py-1 rounded-full ${report.reporterModel === "NGO"
								? "bg-green-100"
								: "bg-blue-100"
								}`}
						>
							<Text
								className={`text-xs font-medium ${report.reporterModel === "NGO"
									? "text-green-800"
									: "text-blue-800"
									}`}
							>
								{report.reporterModel}
							</Text>
						</View>
					</View>

					<Text className="text-gray-200 text-sm font-medium">
						{report.reporter.name}
					</Text>

					<Text className="text-xs text-gray-400">
						{report.timeline.startDate} → {report.timeline.endDate}
					</Text>

					<Text className="text-xs text-gray-500 truncate">
						ID: {report._id}
					</Text>
				</View>

				<Text className="text-[#2298b9] font-medium">View →</Text>
			</View>
		</Link>
	)
}

export default ReportPreviewCard;