import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "../../../../../lib/generated/prisma";

type Task = {
  title: string;
  deadline: Date;
  description: string;
  reminderAt: Date;
  reminderSent: boolean;
  status: Status;
  userId: string;
};

export async function GET(req: Request, {params}: {params: {id: string}}) {
  try {
    const task = await prisma.task.findUnique({
      where: {id: params.id}
    });

    if(!task){
      return NextResponse.json({
        success: false,
        message: "Task not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "task is not found!",
      error: error.message,
    });
  }
}


// edit task by task id
export async function PUT(req: Request, {params}: {params: {id:string}}){
    try {
        const body:Task =await req.json();
        const {
            title,
            deadline,
            description,
            reminderAt,
            reminderSent,
            status,
            userId,
          } = body;
        
          const user = await prisma.user.findUnique({
            where: {id: userId}
          });

          if (!user) {
            return NextResponse.json({
              success: false,
              message: "user not found",
            });
          }

          const task = await prisma.task.update({
            where: { id: params.id },
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

          return NextResponse.json({success: true, data: task})

    } catch (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: "task is not found!",
          error: error.message,
        });
    }
}

// delete task by task id
export async function DELETE(req: Request, {params}: {params: {id: string}}){
    try {
        await prisma.task.delete({
            where: {id: params.id}
        })

        return NextResponse.json({
          success: true,
          message: "Task is deleted",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: "failed to delete task",
        });
    }
}
