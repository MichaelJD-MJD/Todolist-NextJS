import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out",
  });

  // Hapus cookie jwt
  response.cookies.set("jwt", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
