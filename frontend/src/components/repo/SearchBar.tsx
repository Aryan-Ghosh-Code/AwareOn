import { useState } from "react";
import { FaSearch, FaGlobe, FaUserTie } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ProjectSearchBarProps = {
  onSearch: (query: string) => void;
  resetFilters: () => void;
  sdgOptions: string[];
  ownerOptions: { _id: string; name: string; }[];
  onFilterSDG: (sdg: string) => void;
  onFilterOwner: (owner: string) => void;
};

const ProjectSearchBar: React.FC<ProjectSearchBarProps> = ({
  onSearch,
  resetFilters,
  sdgOptions,
  ownerOptions,
  onFilterSDG,
  onFilterOwner,
}) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-full lg:w-[85%] rounded-xl shadow-lg p-4 bg-[#2E2E3A]">
        <div className="flex flex-col gap-4 px-4 py-5 bg-[#2E2E3A]">

          {/* Search Box */}
          <div className="w-full rounded-full p-2 bg-[#373F51] flex items-center gap-4 border-2 border-[#373F51] focus-within:border-[#6EEB83]">
            <FaSearch className="text-gray-300 ml-2" />
            <input
              className="bg-[#373F51] text-gray-200 outline-none border-none rounded-md px-2 py-1 w-full"
              type="text"
              placeholder="Search by Project Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="rounded-full p-2 w-fit bg-blue-600 hover:bg-blue-700 mr-1"
              onClick={handleSearch}
            >
              <FaSearch className="text-white" />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-2">

            {/* SDG Dropdown */}
            <div className="flex items-center gap-2 bg-[#373F51] py-1 px-3 rounded-full border-2 border-[#373F51] hover:border-[#6EEB83]">
              <FaGlobe className="text-blue-400" />
              <select
                className="bg-[#373F51] text-gray-200 outline-none border-none rounded-md px-2 py-1"
                onChange={(e) => onFilterSDG(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Filter by SDG
                </option>
                {sdgOptions.map((sdg) => (
                  <option key={sdg} value={sdg}>
                    {sdg}
                  </option>
                ))}
              </select>
            </div>

            {/* Owner Dropdown */}
            <div className="flex items-center gap-2 bg-[#373F51] py-1 px-3 rounded-full border-2 border-[#373F51] hover:border-[#6EEB83]">
              <FaUserTie className="text-green-400" />
              <select
                className="bg-[#373F51] text-gray-200 outline-none border-none rounded-md px-2 py-1"
                onChange={(e) => onFilterOwner(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Filter by Owner
                </option>
                {ownerOptions.map((owner) => (
                  <option key={owner._id} value={owner.name}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <button
              className="flex items-center gap-2 bg-[#373F51] text-base py-1 px-3 rounded-full border-2 border-[#373F51] text-gray-200 hover:border-[#6EEB83] hover:text-gray-400"
              onClick={resetFilters}
            >
              <MdDelete className="text-red-400" />
              <span className="bg-[#373F51] text-gray-200 outline-none border-none rounded-md px-2 py-1">
                Reset Filters
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSearchBar;
