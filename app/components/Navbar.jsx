"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <nav className="bg-[#442410] dark:bg-[#EFE4D2] text-white dark:text-black shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          HR Dashboard
        </h1>
{/* mobile */}
        <div className="hidden md:flex gap-4">
          <NavButton onClick={() => router.push("/analytics")}>
            Analytics
          </NavButton>
          <NavButton onClick={() => router.push("/bookmarked")}>
            Bookmarks
          </NavButton>
          <NavButton onClick={logout}>Logout</NavButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white dark:text-black"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col mt-4 gap-3 md:hidden">
          <NavButton
            onClick={() => {
              router.push("/analytics");
              setMenuOpen(false);
            }}
          >
            Analytics
          </NavButton>
          <NavButton
            onClick={() => {
              router.push("/bookmarked");
              setMenuOpen(false);
            }}
          >
            Bookmarks
          </NavButton>
          <NavButton
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </NavButton>
        </div>
      )}
    </nav>
  );
}

function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded bg-[#EFE4D2] dark:bg-gray-700 text-black dark:text-white hover:opacity-80 transition-all"
    >
      {children}
    </button>
  );
}
