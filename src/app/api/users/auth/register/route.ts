import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";
import bcrypt from "bcrypt";
import generateToken from "@/lib/jwt";
 
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

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.user.create({
        data: {
          nama,
          email,
          password: hashedPassword,
          profile_pic: imageUrl, // bisa undefined, Prisma akan handle
        },
      });

      let token = "";
      if(user){
        token = generateToken(user.id);
      }

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

      // Set cookie di response instance
      response.cookies.set("jwt", token, {
        maxAge: 7 * 24 * 60 * 60, // dalam detik, bukan ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      return response;
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({success: false, message: "failed to add user"})
    }
    
  }