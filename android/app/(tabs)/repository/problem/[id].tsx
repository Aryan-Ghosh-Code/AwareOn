import CommentModal from '@/components/CommentModal';
import Header from '@/components/Header';
import ActionableInsights from '@/components/problem/ActionableInsights';
import ProblemContent from '@/components/problem/ProblemContent';
import ProblemInfo from '@/components/problem/ProblemInfo';
import ReportPreviewCard from '@/components/report/ReportPreviewCard';
import { useAuthContext } from '@/context/AuthContext';
import useAddComment from '@/hooks/useAddComment';
import useGetProblemById from '@/hooks/useGetProblemById';
import { ProblemProps, ReportPreview } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const ProblemDetails = () => {
	const { id } = useLocalSearchParams();
	const [problem, setProblem] = useState<ProblemProps | null>(null);
	const { loading, getProblemById } = useGetProblemById();
	const { authUser } = useAuthContext();
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [commentForm, setCommentForm] = useState({ message: "" });
	const { loading: commenting, addComment } = useAddComment();

	const getStatusClass = (status: string) => {
		const lower = status.toLowerCase();
		if (lower === "ongoing") return "text-yellow-400 font-bold";
		if (lower === "solved") return "text-green-400 font-bold";
		if (lower === "pending") return "text-red-400 font-bold";
		return "text-gray-300";
	};

	const fetchProblem = async () => {
		if (id) {
			const data = await getProblemById(id as string);
			setProblem(data);
		} else {
			Toast.show({
				type: 'error',
				text1: "Error in fetching Project data",
				position: 'top',
			});
		}
	};

	useEffect(() => {
		fetchProblem();
	}, [id]);

	const submitComment = async () => {
		const message = commentForm.message.trim();
		if (!message) return;

		if (!id) {
			Toast.show({
				type: 'error',
				text1: "Cannot find Project ID",
				position: 'top',
			});
			return;
		}

		await addComment({
			id: id as string,
			type: "Project",
			message
		});
	};

	if (loading || !problem) {
		return (
			<View className="flex-1 items-center justify-center bg-[#0f172a]">
				<ActivityIndicator size="large" color="#2298b9" />
			</View>
		);
	}

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
						paddingHorizontal: 10,
						alignItems: "center",
						paddingVertical: 16,
						paddingBottom: 60
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View className="px-2 pb-6 w-full flex-col items-center justify-center gap-6">
						<ProblemInfo
							problem={problem}
						/>

						<View className='w-full'>
							<ProblemContent
								problem={problem}
							/>
						</View>

						<View className='w-full'>
							<ActionableInsights
								actionableInsights={problem.actionableInsights}
							/>
						</View>

						<View className="mb-4 flex-col gap-6 w-full items-center justify-center bg-gray-800/60 p-6 rounded-xl">
							<Text className="text-blue-400 text-2xl font-semibold">📋 Reports</Text>

							{Array.isArray(problem.reports) && problem.reports.length > 0 ? (
								<View className="rounded-lg border border-gray-700 overflow-hidden w-full">
									<FlatList
										data={(problem.reports as ReportPreview[])}
										keyExtractor={(_, index) => index.toString()}
										renderItem={({ item }) => (
											<ReportPreviewCard report={item} />
										)}
										ItemSeparatorComponent={() => <View className="w-[1px] bg-gray-700" />}
										horizontal
										showsHorizontalScrollIndicator={false}
									/>
								</View>
							) : (
								<Text className="text-gray-400">No reports yet.</Text>
							)}
						</View>

						<View className="mb-4 flex-col gap-6 w-full items-center justify-center bg-gray-800/60 p-6 rounded-xl">
							<View className="rounded-2xl bg-[#242038] p-6 shadow-lg space-y-3">
								<Text className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
									Problem Resolution Status
								</Text>
								<Text className="text-sm text-gray-300">
									<Text className="font-semibold">User Status:</Text>{" "}
									<Text className={getStatusClass(problem.statusForUser)}>
										{problem.statusForUser.toLocaleUpperCase()}
									</Text>
								</Text>
								<Text className="text-sm text-gray-300">
									<Text className="font-semibold">Govt Status:</Text>{" "}
									<Text className={getStatusClass(problem.statusForGovt)}>
										{problem.statusForGovt.toLocaleUpperCase()}
									</Text>
								</Text>
							</View>
						</View>

						<View className="mb-4 flex-col gap-6 w-full items-center justify-center bg-gray-800/60 p-6 rounded-xl">
							<View className="flex-col items-center justify-center">
								<Text className="text-blue-400 text-2xl font-semibold">💬 Comments</Text>
								<Text className="text-sm text-gray-400">
									{Array.isArray(problem.comments) ? problem.comments.length : 0} comments
								</Text>
							</View>

							{Array.isArray(problem.comments) && problem.comments.length > 0 ? (
								<View className="rounded-lg border border-gray-700 overflow-hidden w-full">
									<FlatList
										data={(problem.comments)}
										keyExtractor={(_, index) => index.toString()}
										renderItem={({ item }) => (
											<View className="bg-[#242038] p-3 border-r border-gray-700">
												<Text className="text-sm text-gray-300 font-semibold">{item.name}</Text>
												<Text className="text-gray-200 mt-1">{item.message}</Text>
											</View>
										)}
										ItemSeparatorComponent={() => <View className="w-[1px] bg-gray-700" />}
										horizontal
										showsHorizontalScrollIndicator={false}
									/>
								</View>
							) : (
								<Text className="text-gray-400">No comments yet.</Text>
							)}

							{authUser?.role === "user" && (
								<View className="items-center">
									<TouchableOpacity
										onPress={() => {
											setShowCommentModal(true);
											setCommentForm({ message: "" });
										}}
										className="flex-row items-center gap-2 rounded-xl bg-[#9BA7C0] active:bg-[#758BFD] px-4 py-2 shadow-lg"
										activeOpacity={0.8}
									>
										<Text className="text-[#00241B] text-sm font-medium">➕</Text>
										<Text className="text-[#00241B] text-sm font-medium">Add Comment</Text>
									</TouchableOpacity>

									<Text className="mt-2 text-xs text-gray-400 text-center">
										Share your thoughts or support message for this project
									</Text>
								</View>
							)}
						</View>

						{authUser?.role !== "user" && (
							<View className="flex justify-center mt-3">
								<Link
									href={{
										pathname: "/(tabs)/report/submit/project/[id]",
										params: { id: problem._id },
									}}
									className="py-3 px-12 text-lg font-semibold rounded-xl shadow-md bg-blue-500 text-white active:bg-blue-600"
								>
									Submit a report
								</Link>
							</View>
						)}
					</View>

					{showCommentModal && authUser?.role === "user" && (
						<CommentModal
							showCommentModal={showCommentModal}
							setShowCommentModal={setShowCommentModal}
							submitComment={submitComment}
							commentForm={commentForm}
							setCommentForm={setCommentForm}
							commenting={commenting}
						/>
					)}
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}

export default ProblemDetails;