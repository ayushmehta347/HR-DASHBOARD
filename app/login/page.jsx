"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
   

    const success = login(form.email, form.password);
    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow-2xl dark:bg-gray-900 bg-[#EFE4D2]">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="bg-[#442410] dark:bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Signup
          </a>
        </p>
        {error && <p className="text-red-700 mt-2">{error}</p>}
      </form>
    </div>
  );
}
