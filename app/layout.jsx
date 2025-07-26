import "./globals.css";
import { UserProvider } from "./context/UserContext";
import ThemeToggle from "./components/ThemeToggle"; 
import Navbar from "./components/Navbar";
import {AuthProvider} from "./context/AuthContext"



export const metadata = {
  title: "HR-Dashboard",
  description: "Built with Next.js App Router and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#EFE4D2] dark:bg-gray-900 text-black dark:text-white  transition-colors duration-300 ">
        <AuthProvider>

      <Navbar/>
        <UserProvider>
          <div className="flex justify-end p-4">
            <ThemeToggle />
          </div>
          {children}
        </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
