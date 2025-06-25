"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

export default function AddTask() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [reminderDate, setReminderDate] = React.useState<Date | undefined>(
    undefined
  );

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center px-4 sm:px-6 py-10 bg-gray-50">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Add Task
          </h1>
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          <form>
            {/* Title */}
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 font-semibold text-gray-700"
              >
                Title
              </label>
              <Input id="title" type="text" placeholder="Your task" required />
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
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
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
                  <Input type="time" id="deadline-time" step="1" required />
                </div>
              </div>
            </div>

            {/* Reminder At (Optional) */}
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
                        captionLayout="dropdown"
                        onSelect={setReminderDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1">
                  <label htmlFor="reminder-time" className="block mb-1 text-sm">
                    Time
                  </label>
                  <Input type="time" id="reminder-time" step="1" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6">
              Add Task
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
