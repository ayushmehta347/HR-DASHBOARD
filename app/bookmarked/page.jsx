"use client";

import useDelayedLoading from "@/hooks/useDelayedLoading";
import UserCard from "../components/UserCard";
import { useUsers } from "../context/UserContext";
// import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";



export default function BookmarkPage() {
   const router = useRouter();
   const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth)
      router.push("/login"); 
  }, [isAuth]);


  const { users, bookmarkedUsers } = useUsers();

  const loading = useDelayedLoading(500); 

  //  const [loading, setLoading] = useState(true);

  //  useEffect(() => {
  //    const timer = setTimeout(() => setLoading(false), 500);
  //   //  return () => clearTimeout(timer);
  //  }, []);

  const bookmarkedUserList = users.filter((user) =>
    bookmarkedUsers.includes(user.id)
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-4  text-black dark:text-white flex justify-center flex-col items-center mt-8">
        Bookmarked Users
      </h1>
      <div className="p-1 flex justify-center flex-col items-center ">
        {loading ? (
          <p className="text-black dark:text-white font-bold text-3xl mt-20 animate-pulse ">
            Loading...
          </p>
        ) : bookmarkedUserList.length === 0 ? (
          <p className="text-black dark:text-white font-bold mt-40 text-3xl">
            No users bookmarked yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 p-9">
            {bookmarkedUserList.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
