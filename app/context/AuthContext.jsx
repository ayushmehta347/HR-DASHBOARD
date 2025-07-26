"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedAuth = localStorage.getItem("isAuth") === "true";

    if (storedUser && storedAuth) {
      setCurrentUser(storedUser);
      setIsAuth(true);
    } else {
      setCurrentUser(null);
      setIsAuth(false);
    }

    setLoading(false); // Only render children when done
  }, []);

  const signup = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];

    const userExists = storedUsers.some(
      (u) => u?.email?.toLowerCase() === newUser.email.toLowerCase()
    );

    if (userExists) return false;

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("isAuth", "true");

    setCurrentUser(newUser);
    setIsAuth(true);
    return true;
  };

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];

    const matchedUser = storedUsers.find(
      (u) =>
        u?.email?.toLowerCase() === email.toLowerCase() &&
        u?.password === password
    );

    if (!matchedUser) return false;

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    localStorage.setItem("isAuth", "true");

    setCurrentUser(matchedUser);
    setIsAuth(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isAuth", "false");

    setCurrentUser(null);
    setIsAuth(false);
    router.push("/login");
  };

  if (loading) return null; // Prevent premature redirect/render

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
