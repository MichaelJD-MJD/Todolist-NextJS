import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

type UpdateUserBody = {
  nama: string;
  email: string;
  password: string;
  profile_pic?: string;
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateUserBody = await req.json();
    const { nama, email, password, profile_pic } = body;

    let imageUrl: string | undefined = undefined;

    if (profile_pic) {
      const uploadResult = await uploadToCloudinary(profile_pic);
      imageUrl = uploadResult.secure_url;
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        nama,
        email,
        password,
        profile_pic: imageUrl,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "user is not found!" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "User is deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "failed to delete user",
    });
  }
}
