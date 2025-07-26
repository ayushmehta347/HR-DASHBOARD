"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [promotedUsers, setPromotedUsers] = useState([]);

 
  useEffect(() => {
    const fetchUsers = async () => {
        const cached = localStorage.getItem("users");
        if (cached) {
          setUsers(JSON.parse(cached));
          return;
        }
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();

      const departments = [
        "Engineering",
        "HR",
        "Marketing",
        "Finance",
        "Sales",
      ];

      const updatedUsers = data.users.map((user) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    };

    fetchUsers();
  }, []);

 //bookmark
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedUsers");
    if (storedBookmarks) {
      setBookmarkedUsers(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedUsers", JSON.stringify(bookmarkedUsers));
  }, [bookmarkedUsers]);

  const toggleBookmark = (userId) => {
    setBookmarkedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  //for promoted users

  useEffect(() => {
    const storedPromotedUsers = localStorage.getItem("promotedUsers");
    if (storedPromotedUsers) {
      setPromotedUsers(JSON.parse(storedPromotedUsers));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("promotedUsers", JSON.stringify(promotedUsers));
  }, [promotedUsers]);

  const togglePromotedUsers = (userId) => {
    setPromotedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };


  return (
    <UserContext.Provider
      value={{
        users,
        bookmarkedUsers,
        toggleBookmark,
        togglePromotedUsers,
        promotedUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
