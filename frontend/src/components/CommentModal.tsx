import { useEffect } from "react";
import type { CommentModalProps } from "../types";

const CommentModal = ({
	setShowCommentModal,
	submitComment,
	commentForm,
	setCommentForm,
	commenting
}: CommentModalProps) => {
	useEffect(() => {
		function onEsc(e: KeyboardEvent) {
			if (e.key === "Escape") setShowCommentModal(false);
		}
		document.addEventListener("keydown", onEsc);
		return () => document.removeEventListener("keydown", onEsc);
	}, []);

	return (
		<div
			className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-comment-modal-title"
			onClick={() => setShowCommentModal(false)}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			{/* Panel */}
			<div
				className="relative z- w-full sm:max-w-lg sm:rounded-2xl bg-gray-900 text-gray-100 shadow-2xl p-5 sm:p-6 mx-0 sm:mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-4 mb-4">
					<h3 id="project-comment-modal-title" className="text-lg font-semibold">
						Add Comment
					</h3>
					<button
						type="button"
						onClick={() => setShowCommentModal(false)}
						className="rounded-lg p-2 hover:bg-gray-800 text-gray-300"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				<form onSubmit={submitComment} className="space-y-4">
					<div>
						<label htmlFor="project-comment-message" className="block text-sm font-medium text-gray-300 mb-1">
							Comment *
						</label>
						<textarea
							id="project-comment-message"
							value={commentForm.message}
							onChange={(e) => setCommentForm((p) => ({ ...p, message: e.target.value }))}
							placeholder="Share your thoughts, encouragement, or feedback about this project…"
							required
							rows={4}
							maxLength={500}
							className="w-full rounded-xl bg-[#ffffff] border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-3 outline-none resize-none"
						/>
						<p className="mt-1 text-xs text-gray-400">
							{commentForm.message.length}/500 characters
						</p>
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={() => setShowCommentModal(false)}
							disabled={commenting}
							className="rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={commenting || !commentForm.message.trim()}
							className="rounded-xl bg-[#744253] hover:bg-red-600 disabled:opacity-50 text-white px-6 py-2 font-medium transition hover:scale-105 cursor-pointer"
						>
							{commenting ? "Submitting..." : "Submit Comment"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CommentModal;