import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
} from 'chart.js';
import useGetStats from '../../hooks/useGetStats';
import AppNavbar from '../../components/navbars/AppNavbar';
import Spinner from '../../components/Spinner';
import ProblemDistribution from '../../components/charts/ProblemDistribution';
import ProblemStatus from '../../components/charts/ProblemStatus';
import ProblemResolutions from '../../components/charts/ProblemResolutions';
import TimelineData from '../../components/charts/TimelineData';
import type { StatsProps } from '../../types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
);

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
			<div className="flex w-full min-h-screen items-center justify-center z-0">
				<Spinner size="large" />
			</div>
		);
	}

	const data = {
		totalProblems: stats.problems || 0,
		problemsByMinistry: {
			roadTransport: stats.roadTransportProblems || 0,
			urbanDevelopment: stats.urbanDevelopmentProblems || 0,
			trafficPolice: stats.trafficPoliceProblems || 0,
			transport: stats.transportProblems || 0,
			forest: stats.forestProblems || 0,
			environment: stats.environmentProblems || 0,
			municipalHealth: stats.municipalHealthProblems || 0,
			publicWorks: stats.publicWorksProblems || 0,
			powerSupply: stats.powerSupplyProblems || 0
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
		<>
			<AppNavbar />

			<div className="px-8 md:px-16 lg:px-22 pt-20 pb-6">
				<div className="w-full mx-auto">
					{/* Header */}
					<div className="mb-8 flex flex-col items-center justify-center w-full gap-2">
						<h1 className="text-4xl font-bold text-gray-100 text-center">Ministry Monitoring Dashboard</h1>
						<p className="text-gray-300 text-lg italic  text-center">Environmental and Infrastructure Monitoring</p>
					</div>

					{/* Metrics */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
						<div className="bg-white rounded-lg shadow-md p-6 text-center">
							<h3>Total Problems</h3>
							<p className="text-3xl font-bold">{data.totalProblems}</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6 text-center">
							<h3>Active Problems</h3>
							<p className="text-3xl font-bold text-blue-600">{data.problemStatus.ongoing}</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6 text-center">
							<h3>Total Resolved</h3>
							<p className="text-3xl font-bold text-green-600">{data.problemStatus.resolved}</p>
						</div>
					</div>

					{/* Charts */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<ProblemDistribution
							data={data}
						/>

						<ProblemStatus
							data={data}
						/>

						<ProblemResolutions
							data={data}
						/>

						<TimelineData
							data={data}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProgressTracker;