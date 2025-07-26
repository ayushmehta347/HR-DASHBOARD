// app/analytics/page.jsx
"use client";
 import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useUsers } from "../context/UserContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import useDelayedLoading from "@/hooks/useDelayedLoading";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);



export default function AnalyticsPage() {
  const { users, bookmarkedUsers } = useUsers();
  const [avgRatings, setAvgRatings] = useState({});
  const [bookmarkTrend, setBookmarkTrend] = useState([]);

  const router = useRouter();
     const { isAuth } = useAuth();
    useEffect(() => {
      if (!isAuth)
        router.push("/login"); 
    }, [isAuth]);
  

  const loading = useDelayedLoading(); // ✅ use the hook here

  //  const [loading, setLoading] = useState(true);

  //  useEffect(() => {
  //    const timer = setTimeout(() => setLoading(false), 500);
  //    //  return () => clearTimeout(timer);
  //  }, []);

  useEffect(() => {
    // Group users by department and calculate average ratings
    const deptRatings = {};
    const deptCounts = {};

    users.forEach((user) => {
      const dept = user.department;
      deptRatings[dept] = (deptRatings[dept] || 0) + user.rating;
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });

    const averages = {};
    for (const dept in deptRatings) {
      averages[dept] = (deptRatings[dept] / deptCounts[dept]).toFixed(2);
    }
    setAvgRatings(averages);

    // Mocked bookmark trend over 7 days
    setBookmarkTrend([2, 4, 5, 3, 6, 8, bookmarkedUsers.length]);
  }, [users, bookmarkedUsers]);

  const barChartData = {
    labels: Object.keys(avgRatings),
    datasets: [
      {
        label: "Avg Rating",
        data: Object.values(avgRatings),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
    datasets: [
      {
        label: "Bookmarked Users",
        data: bookmarkTrend,
        fill: false,
        borderColor: "rgba(59, 130, 246, 0.8)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className=" font-bold text-black dark:text-white mt-10 mb-10 text-3xl">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8 md:w-[1200px]">
        {loading ? (
          <p className="text-black dark:text-white font-bold text-3xl  text-center mt-20 animate-pulse   flex  justify-center  ">
            Loading...
          </p>
        ) : (
          <>
            <div className="dark:bg-white bg-[#F3E9DC] p-4 rounded-xl shadow-2xl  ">
              <h2 className="text-lg font-bold mb-2 text-center text-black dark:text-black">
                Department-wise Average Ratings
              </h2>
              <Bar data={barChartData} />
            </div>

            <div className="dark:bg-white bg-[#F3E9DC] shadow-2xl p-4 rounded-xl ">
              <h2 className="text-lg font-bold mb-2 text-center text-black dark:text-black ">
                Bookmark Trends
              </h2>
              <Line data={lineChartData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
