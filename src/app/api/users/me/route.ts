import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if(!token) return NextResponse.json({success: false, Message: "You need to login first"});

    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
        where: {id: payload.userId}
    });

    if(!user) return NextResponse.json({success: false, message: "User not found"});

    return NextResponse.json({
        success: true,
        data: user,
    })
}