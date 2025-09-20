import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
const Activities = () => {
  const [activities] = useState([
    { label: "Problem Repository", color: "bg-[#1d4d86] hover:bg-[#2298b9]", path: "/repository/problem" },
    { label: "Project Repository", color: "bg-[#49752b] hover:bg-[#71af3e]", path: "/repository/project" },
    { label: "Hotspot Dashboard", color: "bg-[#1d4d86] hover:bg-[#2298b9]", path: "/dashboard" },
    { label: "Progress Tracker", color: "bg-[#49752b] hover:bg-[#71af3e]", path: "/progress-tracker" },
    { label: "Upload Problem", color: "bg-[#49752b] hover:bg-[#71af3e]", path: "/repository/problem/upload" },
    { label: "Upload Project", color: "bg-[#1d4d86] hover:bg-[#2298b9]", path: "/repository/project/upload" },
    { label: "Games", color: "bg-[#49752b] hover:bg-[#71af3e]", path: "/game" },
    { label: "Community", color:"bg-[#1d4d86] hover:bg-[#2298b9]", path: "/community"  }
  ]);


  return (
    <div id="activities" className="px-6 md:px-12 mt-12 pb-12">
      <div className="w-full flex flex-col gap-1 items-center justify-center">
        <h2 className="text-gray-200 text-2xl md:text-3xl font-semibold mb-2 text-center">
          Activities
        </h2>
        <p className="text-subhead text-center">Explore our key features and tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {activities.map((activity, index) => (
          <Link
            key={index}
            className={`w-full flex item-center justify-center cursor-pointer py-6 text-lg font-semibold rounded-2xl shadow-md text-white hover:scale-105 transition ${activity.color}`}
            to={activity.path}
          >
            {activity.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activities;

