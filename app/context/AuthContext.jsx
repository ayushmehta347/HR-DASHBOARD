"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router =useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth,setisAuth]=useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
    setisAuth(true);
  }, []);


  //signup
  const signup = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];

    const userExists = storedUsers.some(
      (u) => u?.email?.toLowerCase() === newUser.email.toLowerCase()
    );

    if (userExists) {
      // alert("User already exists. Please login.");
      return false;
    }

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
    return true;
  };

  // Login function
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];

    const matchedUser = storedUsers.find(
      (u) =>
        u?.email?.toLowerCase() === email.toLowerCase() &&
        u?.password === password
    );

    if (!matchedUser) {
      alert("Invalid credentials.");
      return false;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    setCurrentUser(matchedUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout ,isAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
