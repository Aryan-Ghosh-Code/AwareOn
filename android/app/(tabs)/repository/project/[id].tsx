import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ProjectProps, ReportPreview } from '@/interfaces/interfaces';
import useGetProjectById from '@/hooks/useGetProjectById';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import Toast from 'react-native-toast-message';
import ProjectInfoCard from '@/components/project/ProjectInfoCard';
import useInitiatePayment from '@/hooks/useInitiatePayment';
import PlanOption from '@/components/project/PlanOption';
import ReportPreviewCard from '@/components/report/ReportPreviewCard';
import useAddComment from '@/hooks/useAddComment';
import CommentModal from '@/components/CommentModal';

const ProjectDetails = () => {
	const { id } = useLocalSearchParams();
	const [project, setProject] = useState<ProjectProps | null>(null);
	const { loading, getProjectById } = useGetProjectById();
	const { authUser } = useAuthContext();
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const { loading: paying, initiatePayment } = useInitiatePayment();
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [commentForm, setCommentForm] = useState({ message: "" });
	const { loading: commenting, addComment } = useAddComment();

	const fetchProject = async () => {
		if (id) {
			const data = await getProjectById(id as string);
			setProject(data);
		} else {
			Toast.show({
				type: 'error',
				text1: "Error in fetching Project data",
				position: 'top',
			});
		}
	};

	const handleDonate = async () => {
		if (!selectedAmount) {
			Toast.show({
				type: 'error',
				text1: "Please select a donation plan",
				position: 'top',
			});
			return;
		}
		if (!id) {
			Toast.show({
				type: 'error',
				text1: "Project ID not found",
				position: 'top',
			});
			return;
		}

		try {
			const response = await initiatePayment({
				amount: selectedAmount,
				projectId: id as string,
			});

			if (response) {
				await Linking.openURL(response);
			} else {
				Toast.show({
					type: 'error',
					text1: "Failed to initiate payment",
					position: 'top',
				});
			}
		} catch (error) {
			console.error("Payment error:", error);
			Toast.show({
				type: 'error',
				text1: "Something went wrong while initiating payment",
				position: 'top',
			});
		}
	};

	useEffect(() => {
		fetchProject();
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

	if (loading || !project) {
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
						<Text className="text-gray-200 text-3xl font-bold mb-4 text-center">
							{project.name}
						</Text>

						<View className="h-[250px] overflow-hidden rounded-lg w-full">
							<Image
								source={images.bg1}
								resizeMode="cover"
								className="w-full h-full"
							/>
						</View>

						<ProjectInfoCard
							project={project}
						/>

						<View className="mb-4 flex-col gap-6 w-full items-center justify-center">
							<Text className="text-[#B4DC7F] text-2xl font-semibold uppercase mb-3">
								Donation Plans
							</Text>

							<View className="flex-row flex-wrap justify-between w-full">
								{project.tariff.map((plan, idx) => (
									<View key={idx} className="w-[30%] mb-4">
										<PlanOption
											idx={idx}
											plan={plan}
											isSelected={selectedAmount === plan}
											onSelect={() => setSelectedAmount(plan)}
										/>
									</View>
								))}
							</View>

							<TouchableOpacity
								onPress={handleDonate}
								disabled={paying}
								activeOpacity={0.8}
								className={`w-full py-3 rounded-xl shadow-md items-center ${paying ? "opacity-50 bg-[#9BA7C0]" : "bg-[#9BA7C0]"}`}
							>
								{paying ? (
									<ActivityIndicator
										size="small"
										color="#D1D5DB"
									/>
								) : (
									<Text className="text-lg font-semibold text-[#00241B]">Donate now</Text>
								)}
							</TouchableOpacity>
						</View>

						<View className="mb-4 flex-col gap-6 w-full items-center justify-center bg-gray-800/60 p-6 rounded-xl">
							<Text className="text-blue-400 text-2xl font-semibold">📋 Reports</Text>

							{Array.isArray(project.reports) && project.reports.length > 0 ? (
								<View className="rounded-lg border border-gray-700 overflow-hidden w-full">
									<FlatList
										data={(project.reports as ReportPreview[])}
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
							<View className="flex-col items-center justify-center">
								<Text className="text-blue-400 text-2xl font-semibold">💬 Comments</Text>
								<Text className="text-sm text-gray-400">
									{Array.isArray(project.comments) ? project.comments.length : 0} comments
								</Text>
							</View>

							{Array.isArray(project.comments) && project.comments.length > 0 ? (
								<View className="rounded-lg border border-gray-700 overflow-hidden w-full">
									<FlatList
										data={(project.comments)}
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
										params: { id: project._id },
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

export default ProjectDetails;