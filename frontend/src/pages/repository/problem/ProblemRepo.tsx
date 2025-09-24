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

  // 🔄 Fetch problems from backend
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

  // 🏛 Filter by Ministry
  const handleFilterMinistry = (ministry: string) => {
    if (!problems) return;
    const results = problems.filter(
      (problem) => problem.ministry.toLowerCase() === ministry.toLowerCase()
    );
    setFilteredProblems(results);
  };

  // 📍 Filter by Location
  const handleFilterLocation = (location: string) => {
    if (!problems) return;
    const results = problems.filter((problem) =>
      problem.location.address.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredProblems(results);
  };

  // 🔄 Reset filters
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

  // ✅ Unique dropdown options
  const ministryOptions = Array.from(
    new Set(problems?.map((p) => p.ministry) || [])
  );

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
        <h2
          className="flex items-center justify-center gap-2 
          text-2xl md:text-3xl font-bold text-[#2298b9] 
          bg-[#1B2432] border-2 border-[#2298b9]
          rounded-xl px-6 py-3 w-fit mx-auto 
          shadow-lg shadow-[#2298b9]"
        >
          Problems Reported Across Regions
        </h2>

        {/* 🔍 Search & Filters */}
        <ProblemSearchBar
          onSearch={handleSearch}
          resetFilters={resetFilters}
          ministryOptions={ministryOptions}
          locationOptions={locationOptions}
          onFilterMinistry={handleFilterMinistry}
          onFilterLocation={handleFilterLocation}
        />

        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {filteredProblems.length === 0 ? (
            <p className="text-gray-400 text-center">No problems found.</p>
          ) : (
            filteredProblems.map((problem: Problem) => (
              <ProblemCard
                key={problem._id}
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
