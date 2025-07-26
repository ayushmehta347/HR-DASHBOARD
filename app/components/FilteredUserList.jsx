"use client";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import useDelayedLoading from "@/hooks/useDelayedLoading";
import FilterInput from "./SearchFilter";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function FilteredUserList({ users }) {
  const [searchName, setsearchName] = useState("");
  const [searchEmail, setsearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filteredDept, setfilteredDept] = useState("All");
  const [filteredRating, setfilteredRating] = useState("All");

  const router = useRouter();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) router.push("/login");
  }, [isAuth]);

  const departments = ["All", ...new Set(users.map((u) => u.department))];
  // const Ratings = ["All", ...new Set(users.map((u) => u.rating))];
  const Ratings = [
    "All",
    ...[...new Set(users.map((u) => u.rating))].sort((a, b) => a - b),
  ];

  const loading = useDelayedLoading(500);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = `${user?.firstName || ""} ${
        user?.lastName || ""
      }`.toLowerCase();
      const matchesName = fullName.startsWith(searchName.toLowerCase());

      const matchedEmail = (user?.email || "")
        .toLowerCase()
        .startsWith(searchEmail.toLowerCase());

      const matchesDept =
        filteredDept.toLowerCase() === "all" ||
        (user?.department || "").toLowerCase() === filteredDept.toLowerCase();

      const matchesRating =
        filteredRating.toLowerCase() === "all" ||
        String(user?.rating || "").toLowerCase() ===
          filteredRating.toLowerCase();

      return matchesName && matchesDept && matchesRating && matchedEmail;
    });

    setFilteredUsers(filtered);
  }, [searchName, searchEmail, filteredDept, filteredRating, users]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8  text-center text-black dark:text-white ">
        HR Dashboard
      </h1>

      <div className="w-full mt-10 ">
        <div className=" bg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8  ">
          <FilterInput
            label="Filter by Name"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setsearchName(e.target.value)}
          />

          <FilterInput
            label="Filter by Email"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setsearchEmail(e.target.value)}
          />

          <div className="mb-6 text-center ">
            <label className="block text-black dark:text-white mb-2 font-bold">
              Filter by Department
            </label>
            <select
              value={filteredDept}
              placeholder="Search by Name"
              onChange={(e) => setfilteredDept(e.target.value)}
              className="px-4 py-2 rounded-xl border w-full text-black dark:text-black"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 text-center ">
            <label className="block text-black dark:text-white mb-2 font-bold">
              Filter by Rating
            </label>
            <select
              value={filteredRating}
              placeholder="Search by Name"
              onChange={(e) => setfilteredRating(e.target.value)}
              className="px-4 py-2 rounded-xl border w-full text-black dark:text-black"
            >
              {Ratings.map((Rating, idx) => (
                <option key={idx} value={Rating} className="bg-white-800">
                  {Rating}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p className="text-black dark:text-white font-bold text-3xl mt-20 animate-pulse  flex justify-center">
            Loading...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <UserCard key={idx} user={user} />
                ))
              ) : (
                <p className="text-center col-span-full text-black dark:text-white text-3xl text-bold">
                  No users found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
