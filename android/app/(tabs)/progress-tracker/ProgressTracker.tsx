import FundsRaised from '@/components/charts/FundsRaised';
import ProblemDistribution from '@/components/charts/ProblemDistribution';
import ProblemResolution from '@/components/charts/ProblemResolution';
import ProblemStatus from '@/components/charts/ProblemStatus';
import TimelineData from '@/components/charts/TimelineData';
import Header from '@/components/Header';
import useGetStats from '@/hooks/useGetStats';
import { StatsProps } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressTracker = () => {
	const [stats, setStats] = useState<StatsProps | null>(null);
	const { loading, getStats } = useGetStats();

	const fetchStats = async () => {
		const res = await getStats();
		setStats(res);
	};

	useEffect(() => {
		fetchStats();
	}, []);

	if (loading || !stats) {
		return (
			<LinearGradient
				colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="flex-1"
			>
				<View className="flex w-full min-h-screen items-center justify-center z-0">
					<ActivityIndicator size="large" color="#93C5FD" />
				</View>
			</LinearGradient >
		);
	}

	const data = {
		totalProblems: stats.problems || 0,
		problemsBySDG: {
			sdg13: stats.problems13 || 0,
			sdg14: stats.problems14 || 0,
			sdg15: stats.problems15 || 0
		},
		problemStatus: {
			pending: stats.pendingProblems || 0,
			ongoing: stats.ongoingProblems || 0,
			resolved:
				(stats.problems || 0) - (stats.pendingProblems || 0) - (stats.ongoingProblems || 0)
		},
		resolvedComparison: {
			byUsers: stats.resolvedForUser || 0,
			byGovt: stats.resolvedForGovt || 0
		},
		fundsRaised: {
			sdg13: stats.funds13 || 0,
			sdg14: stats.funds14 || 0,
			sdg15: stats.funds15 || 0
		},
		reportedProblems: {
			oneHour: stats.problemsReported?.oneHourAgo || 0,
			sixHours: stats.problemsReported?.sixHoursAgo || 0,
			twelveHours: stats.problemsReported?.twelveHoursAgo || 0,
			oneDay: stats.problemsReported?.oneDayAgo || 0,
			threeDays: stats.problemsReported?.threeDaysAgo || 0,
			sevenDays: stats.problemsReported?.sevenDaysAgo || 0,
			thirtyDays: stats.problemsReported?.thirtyDaysAgo || 0
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-[#010b13]">
			<LinearGradient
				colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="flex-1"
			>
				<Header />

				<ScrollView
					className="flex-1"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						flexGrow: 1,
						paddingHorizontal: 20,
						alignItems: "center",
						paddingVertical: 16,
						paddingBottom: 60
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View className="flex flex-col items-center justify-center gap-2 mb-6">
						<Text className="text-2xl font-bold text-gray-100 text-center">
							SDG Monitoring Dashboard
						</Text>
						<Text className="text-gray-300 text-base italic text-center">
							Climate Action, Life Below Water & Life on Land
						</Text>
					</View>

					{/* Metrics */}
					<View className='flex flex-col p-4 items-center justify-center'>
						<View className="flex flex-row gap-6 mb-8">
							<View className="w-1/2 bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center">
								<Text>Total Problems</Text>
								<Text className="text-3xl font-bold">{data.totalProblems}</Text>
							</View>

							<View className="w-1/2 bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center">
								<Text>Active Problems</Text>
								<Text className="text-3xl font-bold text-blue-600">{data.problemStatus.ongoing}</Text>
							</View>
						</View>

						<View className="flex flex-row gap-6 mb-6">
							<View className="w-1/2 bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center">
								<Text>Total Resolved</Text>
								<Text className="text-3xl font-bold text-green-600">{data.problemStatus.resolved}</Text>
							</View>

							<View className="w-1/2 bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center">
								<Text>Total Funds</Text>
								<Text className="text-3xl font-bold text-purple-600">
									₹{(data.fundsRaised.sdg13 + data.fundsRaised.sdg14 + data.fundsRaised.sdg15).toLocaleString()}
								</Text>
							</View>
						</View>
					</View>

					{/* Charts */}
					<View className="flex flex-col gap-6 items-center justify-center p-4">
						<ProblemDistribution data={data} />

						<ProblemStatus data={data} />

						<ProblemResolution data={data} />

						<FundsRaised data={data} />

						<TimelineData data={data} />
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}

export default ProgressTracker;