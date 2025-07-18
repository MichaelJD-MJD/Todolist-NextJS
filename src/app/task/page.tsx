"use client";

import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";

const TABS = [
  { label: "All tasks", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETE" },
];

export default function Task() {
  const user = useUserStore((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("ALL");

  const fetchTasks = async () => {
    if (!user) return;
    try {
      if (status === "ALL") {
        const response = await axiosInstance.get(`/tasks/user/${user.id}`);
        setTasks(response.data?.data || []);
      } else {
        const response = await axiosInstance.get(
          `/tasks/user/${user.id}/status?status=${status}`
        );
        setTasks(response.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, status]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center px-4 sm:px-6 py-10 bg-gray-50">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hello {user?.nama} 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Let's get started keeping your tasks organized
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-10 border-b border-gray-300">
          {TABS.map((tab, index) => (
            <button
              key={index}
              onClick={() => setStatus(tab.value)}
              className={`pb-2 text-sm sm:text-base font-medium cursor-pointer ${
                status === tab.value
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg font-medium">
            You have no tasks in this category 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                index={i}
                task={task}
                onTaskChange={fetchTasks}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
