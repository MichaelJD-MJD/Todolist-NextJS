"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";

export default function Navbar() {
  const user = useUserStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `font-medium transition ${
      pathname === path
        ? "text-green-600 font-bold"
        : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between w-full max-w-[1130px] py-4 px-6 mx-auto">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-extrabold italic text-green-700">
          TodoApp
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Home
          </Link>
          <Link href="/add-task" className={linkClass("/add-task")}>
            Add Task
          </Link>
          <Link href="/task" className={linkClass("/task")}>
            Task
          </Link>
          <Link
            href="/profile"
            className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full border-2 border-green-500 cursor-pointer"
          >
            <Image
              src={user?.profile_pic || "/assets/images/avatar.png"
              }
              alt="Profile"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Home
            </Link>
            <Link href="/add-task" className={linkClass("/add-task")}>
              Add Task
            </Link>
            <Link href="/task" className={linkClass("/task")}>
              Task
            </Link>
            <Link
              href="/profile"
              className="w-12 h-12 overflow-hidden rounded-full border-2 border-green-500"
            >
              <Image
                src="/assets/images/avatar.png"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
