import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Status } from "../../lib/generated/prisma";

type Task = {
  title: string;
  deadline: Date;
  description: string;
  reminderAt: Date;
  reminderSent: boolean;
  status: Status;
  userId: string;
};


type TaskCardProps = {
  index: number;
  task: Task
};

export default function TaskCard({ task, index }: TaskCardProps) {
  console.log(task);
  return (
    <div
      key={index}
      className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between gap-4
      transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02]
      w-full sm:w-[300px] md:w-[350px]"
    >
      {/* Main Card Content */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        <Link href={`edit-task/${task.id}`}>
          <Pencil className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        {/* Action buttons */}
        <div className="flex gap-4 text-sm">
          {/* Edit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-yellow-500 hover:underline cursor-pointer">
                Edit
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Status?</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-4 mt-4">
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETE">Complete</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="hover:translate-y-0.5 cursor-pointer"
                >
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-red-500 hover:underline cursor-pointer">
                Delete
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <div className="mt-4 text-sm text-gray-600">
                This action cannot be undone.
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor={`task-${index}`}>Mark as completed</label>
          <input
            type="checkbox"
            id={`task-${index}`}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
