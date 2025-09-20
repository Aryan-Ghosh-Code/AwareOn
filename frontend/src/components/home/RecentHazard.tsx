import { useState } from "react";

const NoticeBoard = () => {
  // Ata hard code kora API diye korte hbe
  const [notices] = useState([
    { id: 1, title: "Flood Alert in Assam", date: "Aug 19, 2025" },
    { id: 2, title: "Heatwave Warning in Delhi NCR", date: "Aug 17, 2025" },
    { id: 3, title: "Cyclone Warning in Odisha Coast", date: "Aug 14, 2025" },
    { id: 4, title: "Landslide Alert in Himachal Pradesh", date: "Aug 12, 2025" },
    { id: 5, title: "Heavy Rainfall Expected in Kerala", date: "Aug 10, 2025" },
  ]);

  return (
    <div className="px-8 md:px-16 mt-16">
      <h2 className="text-[#ffffff] text-2xl md:text-3xl font-bold mb-4 text-center uppercase">
        Recent Hazard News
      </h2>

      <div className="bg-[#2E2E3A] rounded-xl shadow-lg p-4 h-96 overflow-y-auto">
        <ul className="space-y-3">
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="bg-[#373F51] rounded-lg p-3 flex flex-col hover:bg-gray-600 transition"
            >
              <span className="text-[#ffffff] font-semibold">{notice.title}</span>
              <span className="text-sm text-[#C5EBC3]">{notice.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeBoard;
