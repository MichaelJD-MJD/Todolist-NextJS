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

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "task is not found!",
        error: error.message,
      },
      { status: 500 }
    );
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

// edit status task by task id
export async function PATCH(req: Request, {params} : {params: {id: string}}){
  try {
    const {status}: {status: Status} = await req.json();

    if (!status) {
      return NextResponse.json({
        success: false,
        message: "Status is required",
      });
    }

    const task = await prisma.task.update({
      where: {id: params.id},
      data: {status},
    });

    return NextResponse.json({
      success: true,
      message: "Task status updated",
      data: task,
    });

  } catch (error) {
    console.error("PATCH status error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update status",
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
