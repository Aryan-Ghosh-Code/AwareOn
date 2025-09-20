import { Link } from "react-router-dom";
import type { ReportPreview } from "../../types";

interface ReportPreviewProps {
    report: ReportPreview
}

const ReportPreviewCard = ({ report }: ReportPreviewProps) => {
    return (
        <li key={report._id} className="bg-[#242038] hover:bg-gray-900/60 transition">
            <Link
                to={`/report/${report._id}`}
                className="flex items-center justify-between w-full px-4 py-3"
            >
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Report</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${report.reporterModel === 'NGO'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}>
                            {report.reporterModel}
                        </span>
                    </div>
                    <span className="text-gray-200 text-sm font-medium">
                        {report.reporter.name}
                    </span>
                    <span className="text-xs text-gray-400">
                        {report.timeline.startDate} → {report.timeline.endDate}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                        ID: {report._id}
                    </span>
                </div>
                <span className="text-[#2298b9] font-medium">View →</span>
            </Link>
        </li>
    )
}

export default ReportPreviewCard