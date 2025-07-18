import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "../../../../../../../lib/generated/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    const url = new URL(req.url);
   const rawStatus = url.searchParams.get("status")?.toUpperCase() as Status;

    // Validasi status
    if (
      !rawStatus ||
      !["PENDING", "IN_PROGRESS", "COMPLETE"].includes(rawStatus)
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing status query parameter",
      });
    }

     const userTaskByStatus = await prisma.task.findMany({
       where: {
         userId: user.id,
         status: rawStatus,
       },
     });

    return NextResponse.json({ success: true, data: userTaskByStatus });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to filter user task",
    });
  }
}
