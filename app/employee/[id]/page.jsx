"use client";
import { useUsers } from "@/app/context/UserContext";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { useState ,useEffect} from "react";
import useDelayedLoading from "@/hooks/useDelayedLoading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";


export default function Page() {
  const { id } = useParams();
  const { users } = useUsers();
  const [activeTab, setActiveTab] = useState("overview");

  const router = useRouter();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) router.push("/login"); // ✅ redirect if not logged in
  }, [isAuth]);


  const user = users.find((u) => u.id === Number(id));
  const loading = useDelayedLoading(500); 

  const bios = [
    "Passionate dev who loves clean code.",
    "Always learning and curious in tech.",
    "Full-stack dev who thrives in teams.",
    "Simplifies complex problems efficiently.",
    "Blends creativity with frontend design.",
    "Builds clean, impactful products.",
    "Loves APIs, DBs, and optimization.",
    "Learner always sharpening skills.",
    "Coder by day, coffee lover too.",
    "Explores new tools and builds fun stuff.",
  ];
  const randomBio = bios[Math.floor(Math.random() * bios.length)];

  const Performance = [
    "Good",
    "Top performer",
    "Average",
    "Need improvement",
    "Moderate",
    "Excellent",
  ];
  const randomPerformance =
    Performance[Math.floor(Math.random() * Performance.length)];

  const Project = [
    "Employee Portal Design",
    "HR Dashboard UI Implementation",
    "Performance Tracking Module",
    "Leave Management System",
    "Recruitment Workflow Automation",
    "Company Internal Chat App",
    "Payroll Integration System",
    "Onboarding Experience Revamp",
    "Exit Survey Analysis Tool",
    "Employee Feedback Tracker",
    "Remote Attendance Tracker",
    "Training Session Scheduler",
    "Internal Job Posting Portal",
    "Benefits & Perks Visualization",
    "Team Performance Heatmap",
  ];
  const randomProject1 = Project[Math.floor(Math.random() * Project.length)];
  const randomProject2 = Project[Math.floor(Math.random() * Project.length)];

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackInput.trim() === "") return alert("Feedback cannot be empty!");

    setFeedbacks([{ text: feedbackInput, author: "You" }, ...feedbacks]);
    setFeedbackInput("");
  };

 if ( id > 30) {
   return (
     <div className="text-center dark:text-white text-black text-3xl font-bold mt-10">
       User with ID : {id} not found.
     </div>
   );
 }
 else{

 

  return (
    <div className="flex flex-col items-center p-6">
      
      <h1 className="text-3xl  font-bold mb-8 text-black dark:text-white">
        User Details for ID: {id}
      </h1>
      {loading ?(
          <p className="text-black dark:text-white font-bold text-3xl mt-20 animate-pulse ">
            Loading...
          </p>
        ) :(
          <>
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["overview", "projects", "feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-9 py-2 rounded-xl gap-5 dark:bg-[#E2C799]  ${
              activeTab === tab
                ? "bg-[#442410] text-white"
                : "bg-white text-black"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-md rounded-xl shadow-md p-4 bg-[#FAF5EF]  text-center mt-5 ">
        {activeTab === "overview" && (
          <>
            <img
              src={user.image}
              alt={user.firstName}
              className="w-24 h-24 rounded-full mx-auto object-cover  m-2 "
              />
            <h2 className="text-xl font-bold mt-2 text-black">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-black ">
              <b>Age:</b> {user.age}
            </p>
            <p className="text-sm text-black ">
              <b>Dept:</b> {user.department}
            </p>
            <p className="text-sm text-black ">
              <b>Phone:</b> {user.phone}
            </p>
            <p className="text-sm text-black ">
              <b>Performance: </b>
              {randomPerformance}
            </p>
            <p className="text-sm text-black ">
              <b>Bio:</b> {randomBio}
            </p>
            <p className="text-sm text-black ">
              <b>Email: </b>
              {user.email}
            </p>
            <p className="text-sm text-black">
              <b>Address:</b> {user.address.address}, {user.address.city},{" "}
              {user.address.state}
            </p>

            <div className="flex justify-center mt-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                key={i}
                className={`text-yellow-500 ${
                  i < user.rating ? "" : "opacity-30"
                }`}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "projects" && (
          <div className="text-left text-black space-y-4 shadow-2xl">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold">{randomProject1}</h3>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold">{randomProject2}</h3>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="text-left text-black space-y-3 shadow-2xl">
            <form onSubmit={handleFeedbackSubmit} className="space-y-2">
              <textarea
                className="w-full p-2 rounded border"
                rows={3}
                placeholder="Write your feedback..."
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                ></textarea>
              <button
                type="submit"
                className="bg-[#442410] text-white px-3 py-1 rounded text-sm"
              >
                Submit Feedback
              </button>
            </form>

            {/* Existing static feedback */}
            <div className="bg-white p-3 rounded shadow">
              <p className="text-sm italic">
                "Very proactive and quick in delivery!"
              </p>
              <p className="text-xs text-right">– Team Lead</p>
            </div>

            {/* New feedbacks added by user */}
            {feedbacks.map((fb, index) => (
              <div key={index} className="bg-white p-3 rounded shadow">
                <p className="text-sm italic">"{fb.text}"</p>
                <p className="text-xs text-right">– {fb.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      </>)}
    </div>
  );
}
}