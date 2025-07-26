"use client";
import { FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useUsers } from "../context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserCard({ user }) {
  const {
    bookmarkedUsers,
    toggleBookmark,
    promotedUsers,
    togglePromotedUsers,
  } = useUsers();
  // const [promote,setPromote]=useState(false);

  const isBookmarked = bookmarkedUsers.includes(user.id);
  const isPromoted = promotedUsers.includes(user.id);
  const router = useRouter();

  return (
    <div className="rounded-3xl shadow-2xl p-4 bg-[#FAF5EF]  mb-10 mt-5  w-full max-w-xs text-center border hover:scale-105 transition-transform duration-300 ">
      <div className="relative flex items-center">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-24 h-24 rounded-full mx-auto object-cover  m-2 "
        />
        <div className="w-8 h-8 flex items-center justify-center absolute top-2 right-2 ">
          {isBookmarked && (
            <FaBookmark className="text-2xl mt-0.5 text-[#442410]  dark:text-gray-900" />
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mt-2 text-black">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-md text-black ">Age: {user.age}</p>
      <p className="text-md  text-black ">Dept: {user.department}</p>
      <p className="text-md text-black  ">{user.email}</p>

      <div className="flex justify-center mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-[#FFB200] ${i < user.rating ? "" : "opacity-30"}`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="bg-[#442410] dark:bg-gray-900 text-white px-3 py-2 rounded text-sm hover:scale-105 w-[120px]"
        >
          View
        </button>

        <button
          onClick={() => toggleBookmark(user.id)}
          className="bg-[#442410] dark:bg-gray-900 text-white w-[120px] py-2 rounded text-sm hover:scale-105 text-center"
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button
          className="bg-[#442410] dark:bg-gray-900 text-white px-3 py-2 rounded text-sm hover:scale-105 w-[120px]"
          onClick={() => togglePromotedUsers(user.id)}
        >
          {isPromoted ? "Promoted" : "Promote"}
        </button>
      </div>
    </div>
  );
}
