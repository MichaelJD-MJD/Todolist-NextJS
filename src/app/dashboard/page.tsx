"use client";

import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(user){
      const fetchTasks = async () => {
        try {
          console.log("Terkesekusi")
          const response = await axiosInstance.get(`/tasks/user/${user?.id}`);
          setTasks(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching task: ", error);
        }
      }

      fetchTasks();
    }
  }, [user]);

  console.log(tasks);

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

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {tasks.map((task,i) => (
            <TaskCard key={i} task={task} />
          ))}
        </div>
      </main>
    </>
  );
}
