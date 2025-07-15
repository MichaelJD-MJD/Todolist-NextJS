"use client"

import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";


export default function Task() {
   const user = useUserStore((state) => state.user);
    const [tasks, setTasks] = useState([]);
  
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/user/${user?.id}`);
        setTasks(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching task: ", error);
      }
    };
  
    useEffect(() => {
      if (user) {
        fetchTasks();
      }
    }, [user]);
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
          {["All tasks", "Pending", "Completed"].map((tab, index) => (
            <button
              key={index}
              className={`pb-2 text-sm sm:text-base font-medium ${
                tab === "All tasks"
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {tasks.map((task, i) => (
            <TaskCard key={i} index={i} task={task} onTaskChange={fetchTasks} />
          ))}
        </div>
      </main>
    </>
  );
}
