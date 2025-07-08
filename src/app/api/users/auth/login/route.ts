import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user?.password);

    if (isValid) {
      const token = generateToken(user.id);
      const response = NextResponse.json({
        success: true,
        data: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          profile_pic: user.profile_pic,
        },
        token,
      });

      response.cookies.set("jwt", token, {
        maxAge: 7 * 24 * 60 * 60, // dalam detik, bukan ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      return response;
    }

    return NextResponse.json({
      success: false,
      message: "invalid credentials",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
