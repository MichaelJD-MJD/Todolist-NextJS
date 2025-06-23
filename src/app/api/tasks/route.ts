import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "../../../../lib/generated/prisma";

type Task = {
  title: string;
  deadline: Date;
  description: string;
  reminderAt: Date;
  reminderSent: boolean;
  status: Status;
  userId: string;
};

export async function POST(req: Request) {
  try {
    const body: Task = await req.json();
    const {
      title,
      deadline,
      description,
      reminderAt,
      reminderSent,
      status,
      userId,
    } = body;

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
        return NextResponse.json({
          success: false,
          message: "user not found"
        });
    }

    const task = await prisma.task.create({
      data: {
        title,
        deadline,
        description,
        reminderAt,
        reminderSent,
        status,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "failed to add task",
    });
  }
}

