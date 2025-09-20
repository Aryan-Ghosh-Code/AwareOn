import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import Spinner from "../../../components/Spinner";
import useGetProblems from "../../../hooks/useGetProblems";
import type { Problem } from "../../../types";
import ProblemSearchBar from "../../../components/repo/ProblemSearch";
import ProblemCard from "../../../components/repo/ProblemCard";

const ProblemRepository = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [filteredProblems, setFilteredProblems] = useState<Problem[] | null>(null);
  const { loading, getProblems } = useGetProblems();

  const fetchProblems = async () => {
    const fetchedProblems = await getProblems();
    setProblems(fetchedProblems);
    setFilteredProblems(fetchedProblems);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // 🔍 Search by problem text
  const handleSearch = (query: string) => {
    if (!problems) return;
    const results = problems.filter((problem) =>
      problem.problem.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(results);
  };

  // 🌍 Filter by SDG
  const handleFilterSDG = (sdg: string) => {
    if (!problems) return;
    const results = problems.filter((problem) => problem.SDG.includes(sdg));
    setFilteredProblems(results);
  };

  // 📍 Filter by location
  const handleFilterLocation = (location: string) => {
    if (!problems) return;
    const results = problems.filter(
      (problem) =>
        problem.location.address.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredProblems(results);
  };

  // 🔄 Reset
  const resetFilters = () => {
    setFilteredProblems(problems);
  };

  if (loading || !filteredProblems) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center z-0">
        <Spinner size="large" />
      </div>
    );
  }

  // Unique dropdown options
  const sdgOptions = Array.from(new Set(problems?.flatMap((p) => p.SDG) || []));

  const locationOptions = Array.from(
    new Set(problems?.map((p) => p.location.address) || [])
  );

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-2 text-center">
          PROBLEM REPOSITORY
        </h1>

        {/* Subtitle */}
        <h2 className="flex items-center justify-center gap-2 
          text-2xl md:text-3xl font-bold text-[#2298b9] 
          bg-[#1B2432] border-2 border-[#2298b9]
          rounded-xl px-6 py-3 w-fit mx-auto 
          shadow-lg shadow-[#2298b9]">
          🌍 Problems Reported Across Regions ⚠️
        </h2>

        {/* Search & Filters */}
        <ProblemSearchBar
          onSearch={handleSearch}
          resetFilters={resetFilters}
          sdgOptions={sdgOptions}
          locationOptions={locationOptions}
          onFilterSDG={handleFilterSDG}
          onFilterLocation={handleFilterLocation}
        />

        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {filteredProblems.length === 0 ? (
            <p className="text-gray-400 text-center">No problems found.</p>
          ) : (
            filteredProblems.map((problem: Problem) => (
              <ProblemCard
                problem={problem}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProblemRepository;