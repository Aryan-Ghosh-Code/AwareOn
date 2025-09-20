import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import UserSignup from "./pages/auth/UserSignup";
import NgoSignup from "./pages/auth/NgoSignup";
import GovSignup from "./pages/auth/GovSignup";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ProjectRepo from "./pages/repository/project/ProjectRepo";
import ProjectDetails from "./pages/repository/project/ProjectDetails";
import ProblemRepository from "./pages/repository/problem/ProblemRepo";
import ProblemUpload from "./pages/upload/ProblemUpload";
import ProjectUpload from "./pages/upload/ProjectUpload";
import Dashboard from "./pages/dashboard/Dashboard";
import ProblemDetails from "./pages/repository/problem/ProblemDetails";
import ProgressTracker from "./pages/progress-tracker/ProgressTracker";
import PaymentSuccess from "./pages/payments/PaymentSuccess";
import SubmitReport from "./pages/report/SubmitReport";
import QuizPage from "./pages/game/QuizPage";
import CommunityChat from "./pages/community/Community";
import ReportDetails from "./pages/report/ReportDetails";
import OnBoard from "./pages/onboarding/OnBoard";
import CommunityList from "./pages/community/CommunityList";
import OpenCommunityChat from "./pages/community/OpenCommunity";

function App() {
	const { authUser } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-[#1e3a2f] via-[#0f2c3f] to-[#0a1625]">
				<Routes>
					<Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />

					{/* Auth Routes */}
					<Route path="/user/signup" element={authUser ? <Navigate to="/home" /> : <UserSignup />} />
					<Route path="/ngo/signup" element={authUser ? <Navigate to="/home" /> : <NgoSignup />} />
					<Route path="/gov/signup" element={authUser ? <Navigate to="/home" /> : <GovSignup />} />
					<Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />

					<Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />

					{/* Repository Routes */}
					<Route path="/repository/project" element={authUser ? <ProjectRepo /> : <Navigate to="/" />} />
					<Route path="/repository/project/:id" element={authUser ? <ProjectDetails /> : <Navigate to="/" />} />
					<Route path="/repository/problem" element={authUser ? <ProblemRepository /> : <Navigate to="/" />} />
					<Route path="/repository/problem/:id" element={authUser ? <ProblemDetails /> : <Navigate to="/" />} />

					{/* Uploads project & Problem */}
					<Route path="/repository/project/upload" element={authUser ? <ProjectUpload /> : <Navigate to="/" />} />
					<Route path="/repository/problem/upload" element={authUser ? <ProblemUpload /> : <Navigate to="/" />} />

					{/* Dashboards & Progress Trackers */}
					<Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
					<Route path="/progress-tracker" element={authUser ? <ProgressTracker /> : <Navigate to="/" />} />

					{/* Reports */}
					<Route path="/report/:id" element={authUser ? <ReportDetails /> : <Navigate to="/" />} />
					<Route path="/report/submit/:type/:id" element={authUser ? <SubmitReport /> : <Navigate to="/" />} />

					{/* Onboarding */}
					<Route path="/onboard" element={authUser ? <OnBoard /> : <Navigate to="/" />} />

					{/* Payments */}
					<Route path="/payment/payment-success" element={authUser ? <PaymentSuccess /> : <Navigate to="/" />} />

					{/* Gamification & Community */}
					<Route path="/game" element={authUser ? <QuizPage /> : <Navigate to="/" />} />
					<Route path="/community" element={authUser ? <CommunityList /> : <Navigate to="/" />} />
					<Route path="/community/:id" element={authUser ? <CommunityChat /> : <Navigate to="/" />} />
					<Route path="/open-community/:id" element={authUser ? <OpenCommunityChat /> : <Navigate to="/" />} />
				</Routes>
				<Toaster />
			</div>
		</>
	)
}

export default App
