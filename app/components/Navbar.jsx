"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  //hide
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#442410] dark:bg-[#EFE4D2] text-white shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer ml-8 dark:text-black text-white"
        onClick={() => router.push("/")}
      >
        HR Dashboard
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/analytics")}
          className="px-4 py-2 rounded bg-[#EFE4D2] dark:bg-gray-700 text-black dark:text-white"
        >
          Analytics
        </button>

        <button
          onClick={() => router.push("/bookmarked")}
          className="px-4 py-2 rounded bg-[#EFE4D2] dark:bg-gray-700 text-black dark:text-white"
        >
          Bookmarks
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 rounded bg-[#EFE4D2] dark:bg-gray-700 text-black dark:text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
