"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date string
  reminderAt: string | null;
  reminderSent: boolean;
  status: string;
  userId: string;
};

export default function EditTask() {
  const router = useRouter();

 const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [reminderDate, setReminderDate] = useState<Date>();
  const [task, setTask] = useState<Task | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [reminderAtTime, setReminderAtTime] = useState("");

  const params = useParams();
  const taskId = params.id;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        const taskData: Task = response.data?.data;

        setTask(taskData);

        // Set individual form fields
        setTitle(taskData.title);
        setDescription(taskData.description);

        const deadline = new Date(taskData.deadline);
        setDeadlineDate(deadline);
        setDeadlineTime(deadline.toISOString().substring(11, 16)); // format hh:mm

        if (taskData.reminderAt) {
          const reminder = new Date(taskData.reminderAt);
          setReminderDate(reminder);
          setReminderAtTime(reminder.toISOString().substring(11, 16)); // format hh:mm
        }
      } catch (error) {
        console.error("Error fetching task: ", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deadline = new Date(
      deadlineDate!.getFullYear(),
      deadlineDate!.getMonth(),
      deadlineDate!.getDate(),
      parseInt(deadlineTime.split(":")[0]),
      parseInt(deadlineTime.split(":")[1]),
      parseInt(deadlineTime.split(":")[2] ?? "0")
    ).toISOString();

    const reminderAt = reminderDate
      ? new Date(
          reminderDate.getFullYear(),
          reminderDate.getMonth(),
          reminderDate.getDate(),
          parseInt(reminderAtTime.split(":")[0]),
          parseInt(reminderAtTime.split(":")[1]),
          parseInt(reminderAtTime.split(":")[2] ?? "0")
        ).toISOString()
      : undefined;

    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, {
        title,
        description,
        deadline,
        reminderAt,
        userId: user?.id
      });
      console.log(response);
      if (response.data?.success) {
        toast.success("Task Edit successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center px-4 sm:px-6 py-10 bg-gray-50">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Edit Task
          </h1>
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 font-semibold text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Your task"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 font-semibold text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Type your description here."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Deadline */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                Deadline
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="deadline-date" className="block mb-1 text-sm">
                    Date
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="deadline-date"
                        className="w-full justify-between font-normal"
                      >
                        {deadlineDate
                          ? deadlineDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={deadlineDate}
                        onSelect={(date) => {
                          setDeadlineDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1">
                  <label htmlFor="deadline-time" className="block mb-1 text-sm">
                    Time
                  </label>
                  <Input
                    type="time"
                    id="deadline-time"
                    step="1"
                    required
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Reminder At */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                Reminder At{" "}
                <span className="text-sm text-gray-400">(Optional)</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="reminder-date" className="block mb-1 text-sm">
                    Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="reminder-date"
                        className="w-full justify-between font-normal"
                      >
                        {reminderDate
                          ? reminderDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={reminderDate}
                        onSelect={setReminderDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1">
                  <label htmlFor="reminder-time" className="block mb-1 text-sm">
                    Time
                  </label>
                  <Input
                    type="time"
                    id="reminder-time"
                    step="1"
                    value={reminderAtTime}
                    onChange={(e) => setReminderAtTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-6">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
