import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { useParams, Link } from "react-router-dom";
import useGetProjectById from "../../../hooks/useGetProjectById";
import toast from "react-hot-toast";
import type { Project, ReportPreview } from "../../../types";
import useInitiatePayment from "../../../hooks/useInitiatePayment";
import useAddComment from "../../../hooks/useAddComment";
import Spinner from "../../../components/Spinner";
import ProjectInfoCard from "../../../components/project/ProjectInfoCard";
import ReportPreviewCard from "../../../components/project/ReportPreviewCard";
import CommentModal from "../../../components/CommentModal";
import { useAuthContext } from "../../../context/AuthContext";

const ProjectDetails = () => {
	const { id } = useParams();
	const [project, setProject] = useState<Project | null>(null);
	const { loading, getProject } = useGetProjectById();
	const { loading: paying, initiatePayment } = useInitiatePayment();
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [commentForm, setCommentForm] = useState({ message: "" });
	const { loading: commenting, addComment } = useAddComment();
	const { authUser } = useAuthContext();

	const fetchProject = async () => {
		if (id) {
			const data = await getProject(id);
			setProject(data);
		} else {
			toast.error("Error in fetching Project data");
		}
	};

	useEffect(() => {
		fetchProject();
	}, []);

	const handleDonate = async () => {
		if (!selectedAmount) {
			toast.error("Please select a donation plan");
			return;
		}
		if (!id) {
			toast.error("Project ID not found");
			return;
		}

		try {
			const response = await initiatePayment({
				amount: selectedAmount,
				projectId: id,
			});

			if (response) {
				window.location.href = response;
			} else {
				toast.error("Failed to initiate payment");
			}
		} catch (error) {
			console.error("Payment error:", error);
			toast.error("Something went wrong while initiating payment");
		}
	};

	const submitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		const message = commentForm.message.trim();
		if (!message) return;

		if (!id) {
			toast.error("Cannot find id");
			return;
		}

		await addComment({
			id,
			type: "Project",
			message
		});
	};

	if (!project || loading) {
		return (
			<>
				<div className="px-8 md:px-16 pt-20 text-center text-red-400 text-xl h-screen flex items-center justify-center">
					<Spinner size="large" />
				</div>
			</>
		);
	}

	return (
		<>
			<AppNavbar />

			<div className="px-8 md:px-16 pt-20 pb-6">
				<h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-6 text-center">
					{project.name}
				</h1>

				{/* Image */}
				<img
					src="/bg1.jpg"
					alt={project.name}
					className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg mb-6"
				/>

				<ProjectInfoCard
					project={project}
				/>

				{/* Tariff Plans */}
				<h2 className="text-[#B4DC7F] text-2xl font-semibold uppercase mb-4  ">
					Donation Plans
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-gray-200">
					{project.tariff.map((plan, idx) => {
						const planLabel = String.fromCharCode(65 + idx); // 65 = 'A'
						const isSelected = selectedAmount === plan;
						return (
							<div
								key={idx}
								onClick={() => setSelectedAmount(plan)}
								className={`cursor-pointer bg-gray-700 p-6 rounded-xl shadow-md text-center transition 
                ${isSelected ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"}`}
							>
								<p className="text-xl font-bold">Plan {planLabel}</p>
								<p className="text-green-400 text-lg">₹ {plan}</p>
							</div>
						);
					})}
				</div>

				<button
					onClick={handleDonate}
					disabled={paying}
					className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-[#9BA7C0]  hover:bg-[#758BFD] text-[#00241B] transition disabled:opacity-50 cursor-pointer"
				>
					{paying ? "Processing..." : "Donate Now"}
				</button>

				{/* Reports */}
				<section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
					<h2 className="text-blue-400 text-2xl font-semibold pb-4">📋 Reports</h2>

					{Array.isArray(project.reports) && project.reports.length > 0 ? (
						<ul className="divide-y divide-gray-700 rounded-xl overflow-hidden border border-gray-700">
							{(project.reports as ReportPreview[]).map((report: ReportPreview) => (
								<ReportPreviewCard
									report={report}
								/>
							))}
						</ul>
					) : (
						<p className="text-gray-400">No reports yet.</p>
					)}
				</section>

				<section className="mt-10 rounded-2xl bg-[#242038] p-6 shadow-lg">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
						<span className="text-sm text-gray-400">
							{Array.isArray(project.comments) ? project.comments.length : 0} comments
						</span>
					</div>

					{Array.isArray(project.comments) && project.comments.length > 0 ? (
						<ul className="space-y-4">
							{project.comments.map((c) => (
								<li key={c._id} className="bg-gray-900/70 p-3 rounded-lg border border-gray-700">
									<p className="text-sm text-gray-300 font-semibold">{c.name}</p>
									<p className="text-gray-200 mt-1">{c.message}</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-400">No comments yet.</p>
					)}

					{authUser?.role === "user" && (
						<div className="text-center mt-4">
							<button
								type="button"
								onClick={() => {
									setShowCommentModal(true);
									setCommentForm({ message: "" });
								}}
								className="inline-flex items-center gap-2 rounded-xl bg-[#9BA7C0]  hover:bg-[#758BFD] text-[#00241B] px-4 py-2 font-medium transition hover:scale-105 shadow-lg  cursor-pointer text-sm"
							>
								<span>➕</span>
								Add Comment
							</button>
							<p className="mt-2 text-xs text-gray-400">
								Share your thoughts or support message for this project
							</p>
						</div>
					)}
				</section>

				{authUser?.role !== "user" && (
					<div className="flex justify-center mt-6">
						<Link
							to={`/report/submit/Project/${id}`}
							className="py-3 px-12 text-lg font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition"
						>
							Submit a report
						</Link>
					</div>
				)}
			</div>

			{showCommentModal && authUser?.role === "user" && (
				<CommentModal
					setShowCommentModal={setShowCommentModal}
					submitComment={submitComment}
					commentForm={commentForm}
					setCommentForm={setCommentForm}
					commenting={commenting}
				/>
			)}
		</>
	);
};

export default ProjectDetails;