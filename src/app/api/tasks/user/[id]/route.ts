import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get task by user id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
        where: {
            id: params.id
        }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    const userTasks = await prisma.task.findMany({
      where: {
        userId: params.id,
      },
    });


    return NextResponse.json({ success: true, data: userTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get user task",
    });
  }
}