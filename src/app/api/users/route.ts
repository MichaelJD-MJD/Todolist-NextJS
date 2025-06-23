import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "../../../../lib/generated/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const config = {
    api: {
      bodyParser: false, // penting! biar Next.js gak auto-parse
    },
  };
  
  type CreateUserBody = {
    nama: string;
    email: string;
    password: string;
    profile_pic?: string;
  };

  export async function POST(req: Request) {
    try {
      const body: CreateUserBody = await req.json();
      const { nama, email, password, profile_pic } = body;

      let imageUrl: string | undefined = undefined;

      if (profile_pic) {
        const uploadResult = await uploadToCloudinary(profile_pic);
        imageUrl = uploadResult.secure_url;
      }

      const user = await prisma.user.create({
        data: {
          nama,
          email,
          password,
          profile_pic: imageUrl, // bisa undefined, Prisma akan handle
        },
      });

      return NextResponse.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({success: false, message: "failed to add user"})
    }
    
  }

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
