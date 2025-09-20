import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppNavbar from "../../components/navbars/AppNavbar";
import toast from "react-hot-toast";
import type { Report } from "../../types";
import useGetReportById from "../../hooks/useGetReportById";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const {loading, getReportById} = useGetReportById();

  const fetchReport = async () => {
    if (!id) {
      toast.error("Cannot get Report ID");
      return;
    }
    try {
      const data = await getReportById(id);
      setReport(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch report");
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !report) {
    return (
      <>
        <AppNavbar />
        <div className="min-h-[60vh] flex items-center justify-center text-gray-200">
          Loading report...
        </div>
      </>
    );
  }

  const { timeline, reporter, actions, workforce, articulateProof, intentModel, intentId } = report;
  const created = report.createdAt ? new Date(report.createdAt).toLocaleString() : null;

  return (
    <>
      <AppNavbar />
      <main className="px-6 md:px-12 pt-24 max-w-5xl mx-auto pb-10">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Report Details</h1>
          <Link to={-1 as any} className="text-blue-400 hover:underline">
            ← Back
          </Link>
        </header>

        {/* Timeline */}
        <section className="rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-3">Timeline</h2>
          <p className="text-gray-200">
            Report: <span className="font-medium">{timeline?.startDate}</span>
            {" "}&rarr;{" "}
            <span className="font-medium">{timeline?.endDate}</span>
          </p>
          {created && (
            <p className="text-sm text-gray-400 mt-1">Created: {created}</p>
          )}
        </section>

        {/* Reporter */}
        <section className="mt-6 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-3">Reporter</h2>
          <p className="text-gray-200">
            <span className="font-medium">{reporter?.name}</span> ({report.reporterModel})
          </p>
          {reporter?.email && (
            <p className="text-sm text-gray-400">{reporter.email}</p>
          )}
        </section>

        {/* Intent */}
        <section className="mt-6 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-3">Intent</h2>
          <p className="text-gray-200">
            <span className="font-medium">{intentModel}</span> — ID: {intentId}
          </p>
        </section>

        {/* Actions */}
        {Array.isArray(actions) && actions.length > 0 && (
          <section className="mt-6 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-3">Actions Performed</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              {actions.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Workforce */}
        <section className="mt-6 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-3">Workforce</h2>
          <p className="text-gray-200">{workforce ?? 0} people</p>
        </section>

        {/* Proofs */}
        {Array.isArray(articulateProof) && articulateProof.length > 0 && (
          <section className="mt-6 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-3">Evidence</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {articulateProof.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition"
                >
                  <img
                    src={url}
                    alt={`Proof ${idx + 1}`}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ReportDetails;
