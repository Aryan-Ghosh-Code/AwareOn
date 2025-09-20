import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";
import useVerifyPayment from "../../hooks/useVerifyPayment";
import type { PaymentVerificationResponse } from "../../types";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { loading, verifyPayment } = useVerifyPayment();

	const [paymentData, setPaymentData] = useState<PaymentVerificationResponse | null>(null);

	const handleConfirmFunding = async () => {
		const payload = {
			razorpay_payment_id: searchParams.get("razorpay_payment_id") ?? "",
			razorpay_payment_link_id: searchParams.get("razorpay_payment_link_id") ?? "",
			razorpay_payment_link_reference_id: searchParams.get("razorpay_payment_link_reference_id") ?? "",
			razorpay_payment_link_status: searchParams.get("razorpay_payment_link_status") ?? "",
			razorpay_signature: searchParams.get("razorpay_signature") ?? "",
			projectId: searchParams.get("projectId") ?? "",
		};

		const response = await verifyPayment(payload);
		if (response) {
			setPaymentData(response);
		}
	};

	const handleGoToProjects = () => {
		navigate("/repository/project");
	};

	return (
		<>
			<AppNavbar />
			<div className="flex flex-col items-center justify-center px-6 py-20">
				<h1 className="text-3xl font-bold text-green-400 mb-6">
					🎉 Payment Successful!
				</h1>

				{loading && <p className="text-gray-400">Verifying your payment...</p>}

				{!paymentData && (
					<button
						onClick={handleConfirmFunding}
						className="mt-8 px-6 py-3 text-lg rounded-xl shadow-md bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
					>
						Confirm Funding
					</button>
				)}

				{paymentData && (
					<>
						<div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4">
							<h2 className="text-xl font-semibold text-white">Payment Summary</h2>
							<p className="text-gray-300">
								<span className="font-semibold">Payment ID:</span> {paymentData.paymentSummary.id}
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Status:</span>{" "}
								<span
									className={
										paymentData.paymentSummary.status === "captured"
											? "text-green-400 font-semibold"
											: "text-red-400 font-semibold"
									}
								>
									{paymentData.paymentSummary.status}
								</span>
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Amount:</span>{" "}
								₹{paymentData.paymentSummary.amount} {paymentData.paymentSummary.currency}
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Method:</span>{" "}
								{paymentData.paymentSummary.method}
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Captured:</span>{" "}
								{paymentData.paymentSummary.captured ? "✅ Yes" : "❌ No"}
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Created At:</span>{" "}
								{new Date(paymentData.paymentSummary.created_at * 1000).toLocaleString()}
							</p>

							<h2 className="text-xl font-semibold text-white mt-6">Updated Project</h2>
							<p className="text-gray-300">
								<span className="font-semibold">Project Name:</span>{" "}
								{paymentData.updatedProject.name}
							</p>
							<p className="text-gray-300">
								<span className="font-semibold">Funds Raised:</span>{" "}
								₹{paymentData.updatedProject.fundRaised}
							</p>
						</div>

						<button
							onClick={handleGoToProjects}
							className="mt-8 px-6 py-3 text-lg rounded-xl shadow-md bg-green-500 hover:bg-green-600 text-white transition cursor-pointer"
						>
							Go to Projects
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default PaymentSuccess;