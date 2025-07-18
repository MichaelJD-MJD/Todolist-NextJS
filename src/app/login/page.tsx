"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const setUser = useUserStore.getState().setUser;
      const response = await axiosInstance.post("/users/auth/login", {
        email,
        password,
      });

      console.log(response);

      if (response.data.success) {
        toast.success("Login success");
        localStorage.setItem("token", response.data.token);
        setUser(response.data.data);
        router.push("/dashboard", response.data);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Login to your account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@email.com"
              className="py-5 px-4 rounded-xl shadow transition duration-300 ease-in-out hover:-translate-y-0.5"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="py-5 px-4 rounded-xl shadow transition duration-300 ease-in-out hover:-translate-y-0.5"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="cursor-pointer w-full py-5 text-lg rounded-xl bg-green-500 text-white hover:bg-green-600 transition hover:-translate-y-0.5"
          >
            Login
          </Button>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <span>Don't have an account? </span>
            <Link
              href="/register"
              className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer"
            >
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
