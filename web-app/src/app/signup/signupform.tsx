"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="px-4 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
          >
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
