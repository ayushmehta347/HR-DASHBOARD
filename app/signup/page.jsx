"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length <= 6) {
      
      setError("Minimum password length should be 6");
      return;
    }

   
    const success = signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (success) {
      setMessage("Signup successful! Please login.");
      setError("");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError("User already exists. Please login.");
      setMessage("");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-[#442410] dark:text-white">
        Signup
      </h2>
      <div className="max-w-lg  mx-auto mt-10 p-8  rounded-2xl shadow-2xl bg-[#FAF5EF]  dark:bg-gray-700">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            className="w-full p-2 border mb-2 text-black dark-text-black rounded-xl mt-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-2 text-black dark-text-black rounded-xl mt-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full p-2 border mb-4 text-black dark-text-black rounded-xl mt-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className=" text-white px-4 py-2  w-full bg-[#442410] dark:bg-blue-600 rounded-xl mt-2">
            Signup
          </button>
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
          {message && <p className="text-green-700 mt-2  ml-9">{message}</p>}
        </form>
      </div>
    </>
  );
}
