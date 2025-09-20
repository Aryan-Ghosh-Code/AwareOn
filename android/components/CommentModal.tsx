import { CommentModalProps } from "@/interfaces/interfaces";
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

const CommentModal = ({
	showCommentModal,
	setShowCommentModal,
	submitComment,
	commentForm,
	setCommentForm,
	commenting,
}: CommentModalProps) => {
	return (
		<Modal
			visible={showCommentModal}
			transparent
			animationType="fade"
			onRequestClose={() => setShowCommentModal(false)}
		>
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				{/* Overlay */}
				<TouchableOpacity
					activeOpacity={1}
					className="flex-1 bg-black/60"
					onPress={() => setShowCommentModal(false)}
				/>

				{/* Panel */}
				<View className="absolute bottom-0 left-0 right-0 sm:inset-0 sm:m-auto sm:max-w-lg sm:rounded-2xl bg-gray-900 text-gray-100 shadow-2xl p-5 sm:p-6 mx-0 sm:mx-4">
					<View className="flex-row items-start justify-between mb-4">
						<Text className="text-lg font-semibold text-gray-100">
							Add Comment
						</Text>
						<TouchableOpacity
							onPress={() => setShowCommentModal(false)}
							className="rounded-lg p-2 bg-gray-800/40"
						>
							<Text className="text-gray-300 text-lg">✕</Text>
						</TouchableOpacity>
					</View>

					{/* Form */}
					<View className="space-y-4">
						<View>
							<Text className="text-sm font-medium text-gray-300 mb-1">
								Comment *
							</Text>
							<TextInput
								multiline
								numberOfLines={4}
								maxLength={500}
								value={commentForm.message}
								onChangeText={(text) =>
									setCommentForm((p) => ({ ...p, message: text }))
								}
								placeholder="Share your thoughts, encouragement, or feedback about this project…"
								placeholderTextColor="#9ca3af"
								className="w-full rounded-xl bg-white border border-gray-700 text-gray-900 p-3"
							/>
							<Text className="mt-1 text-xs text-gray-400">
								{commentForm.message.length}/500 characters
							</Text>
						</View>

						{/* Actions */}
						<View className="flex-row justify-end gap-3 pt-2">
							<TouchableOpacity
								onPress={() => setShowCommentModal(false)}
								disabled={commenting}
								className="rounded-xl bg-gray-700 px-4 py-2 disabled:opacity-50"
							>
								<Text className="text-white">Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={submitComment}
								disabled={commenting || !commentForm.message.trim()}
								className="rounded-xl bg-[#744253] px-6 py-2 disabled:opacity-50"
							>
								<Text className="text-white font-medium">
									{commenting ? "Submitting..." : "Submit Comment"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

export default CommentModal;