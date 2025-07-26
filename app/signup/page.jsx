"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      setMessage("");
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
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow-2xl bg-[#EFE4D2] dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 ">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          className="w-full p-2 border mb-2 text-black dark-text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
        type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2 text-black dark-text-black"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 border mb-4 text-black dark-text-black"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className=" text-white px-4 py-2 rounded w-full bg-[#442410] dark:bg-blue-600">
          Signup
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {message && <p className="text-green-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
