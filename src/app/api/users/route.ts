import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "../../../../lib/generated/prisma";

export const config = {
    api: {
      bodyParser: false, // penting! biar Next.js gak auto-parse
    },
  };  

export async function GET() {
  try {
    const users: User[] = await prisma.user.findMany();
    console.log(users);

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({success: false, message: "Something went wrong"})
  }
}


