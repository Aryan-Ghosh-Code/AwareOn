import { Link, useParams } from "react-router-dom";
import AppNavbar from "../../../components/navbars/AppNavbar";
import type { Problem, ReportPreview } from "../../../types";
import { useEffect, useState } from "react";
import useGetProblemById from "../../../hooks/useGetProblemById";
import toast from "react-hot-toast";
import useAddComment from "../../../hooks/useAddComment";
import Spinner from "../../../components/Spinner";
import CommentModal from "../../../components/CommentModal";
import { useAuthContext } from "../../../context/AuthContext";
import ReportPreviewCard from "../../../components/project/ReportPreviewCard";
import ProblemInfo from "../../../components/problem/ProblemInfo";
import ProblemContent from "../../../components/problem/ProblemContent";
import ActionableInsights from "../../../components/problem/ActionableInsights";
import WorkingEntityPreviewCard from "../../../components/problem/WorkingEntityPreviewCard";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const { loading, getProblem } = useGetProblemById();
  const { authUser } = useAuthContext();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentForm, setCommentForm] = useState({ message: "" });
  const { loading: commenting, addComment } = useAddComment();

  const fetchProblem = async () => {
    if (!id) {
      toast.error("Cannot get Problem ID");
      return;
    }
    const data = await getProblem(id);
    setProblem(data);
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  if (loading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen text-white p-6">
        <Spinner size="large" />
      </div>
    );
  }

  const getStatusClass = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "pending") return "text-yellow-400 font-bold";
    if (lower === "ongoing") return "text-blue-400 font-bold";
    if (lower === "solved") return "text-green-400 font-bold";
    return "text-gray-300";
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
      type: "Problem",
      message
    });
  };

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20 w-full lg:w-[90%] mx-auto pb-6">
        <div className="mb-8">
          <ProblemInfo problem={problem} />
        </div>

        {/* Main Content Grid */}
        <ProblemContent problem={problem} />

        {/* New schema fields */}
        <section className="rounded-2xl bg-[#242038] p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Additional Info</h2>
          <p className="text-gray-300"><span className="font-semibold">Ministry:</span> {problem.ministry}</p>
          <p className="text-gray-300"><span className="font-semibold">Alert Level:</span> {problem.alertLevel}</p>
          <p className="text-gray-300"><span className="font-semibold">Confidence:</span> {(problem.confidence * 100.0).toFixed(2)}%</p>
          {problem.description && (
            <p className="text-gray-300 mt-2"><span className="font-semibold">Description:</span> {problem.description}</p>
          )}
        </section>

        {/* Actionable Insights */}
        <ActionableInsights actionableInsights={problem.actionableInsights} />

         {/* Short Term Impacts */}
        <section className="mt-8 rounded-2xl bg-[#242038] p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
            Short Term Impacts
          </h2>
          {Array.isArray(problem.shortTermImpacts) && problem.shortTermImpacts.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {problem.shortTermImpacts.map((impact, idx) => (
                <li key={idx}>{impact}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No short term impacts available.</p>
          )}
        </section>

        {/* Long Term Impacts */}
        <section className="mt-8 rounded-2xl bg-[#242038] p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
            Long Term Impacts
          </h2>
          {Array.isArray(problem.longTermImpacts) && problem.longTermImpacts.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {problem.longTermImpacts.map((impact, idx) => (
                <li key={idx}>{impact}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No long term impacts available.</p>
          )}
        </section>

        {/* Reports */}
        <section className="mt-8 rounded-2xl bg-[#242038] p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
            Reports
          </h2>

          {Array.isArray(problem.reports) && problem.reports.length > 0 ? (
            <ul className="divide-y divide-gray-700 rounded-xl overflow-hidden border border-gray-700">
              {(problem.reports as ReportPreview[]).map((report: ReportPreview) => (
                <ReportPreviewCard key={report._id} report={report} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No reports yet.</p>
          )}
        </section>

        {/* Govt + Status */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#242038] p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
              Govt Bodies Working
            </h2>
            {problem.GovtWorking.length > 0 ? (
              <ul className="divide-y divide-gray-700 rounded-xl overflow-hidden border border-gray-700">
                {problem.GovtWorking.map((gov, idx) => (
                  <WorkingEntityPreviewCard
                    key={gov._id || idx}
                    entity={gov}
                    idx={idx}
                    defaultImage="/Govt.png"
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No Govt bodies reported yet.</p>
            )}
          </div>

          <div className="rounded-2xl bg-[#242038] p-6 shadow-lg space-y-3">
            <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-3">
              Problem Resolution Status
            </h2>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">User Status:</span>{" "}
              <span className={getStatusClass(problem.statusForUser)}>
                {problem.statusForUser}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Govt Status:</span>{" "}
              <span className={getStatusClass(problem.statusForGovt)}>
                {problem.statusForGovt}
              </span>
            </p>
          </div>
        </section>

        {/* Comments */}
        <section className="mt-8 rounded-2xl bg-[#242038] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
            <span className="text-sm text-gray-400">
              {Array.isArray(problem.comments) ? problem.comments.length : 0} comments
            </span>
          </div>

          {Array.isArray(problem.comments) && problem.comments.length > 0 ? (
            <ul className="space-y-4">
              {problem.comments.map((c, idx) => (
                <li key={c._id || idx} className="bg-gray-900/70 p-3 rounded-lg border border-gray-700">
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#9BA7C0] hover:bg-[#758BFD] text-[#00241B] px-4 py-2 font-medium transition hover:scale-105 shadow-lg cursor-pointer text-sm"
              >
                <span>➕</span>
                Add Comment
              </button>
              <p className="mt-2 text-xs text-gray-400">
                Share your thoughts or report additional details about this problem
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

export default ProblemDetails;
