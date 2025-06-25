import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
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
        <form className="space-y-6">
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
              placeholder="********"
              className="py-5 px-4 rounded-xl shadow transition duration-300 ease-in-out hover:-translate-y-0.5"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-5 text-lg rounded-xl bg-green-500 text-white hover:bg-green-600 transition hover:-translate-y-0.5"
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
