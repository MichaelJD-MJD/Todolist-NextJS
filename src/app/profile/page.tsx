"use client"

import Navbar from "@/components/Navbar";
import { axiosInstance } from "@/lib/axios";
import { logout } from "@/lib/logout";
import { useUserStore } from "@/lib/store";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [selectedImg, setSelectedImg] = useState();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore.getState().setUser;

  const updateProfile = async (data: string) => {
    try {
      const response = await axiosInstance.put(`/users/${user?.id}`, {
        profile_pic: data,
      });
      console.log(response);
      if(response.data.success){
        setUser(response.data.data);
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error("Something went wrong!");
    }
  }

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile(base64Image);
    }

  }

  const handleLogout = async() => {
    logout();
    toast.success("Logout success!");
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center px-4 sm:px-6 py-10 bg-gray-50">
        <section className="w-full max-w-md bg-gray-100 rounded-lg shadow p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <p className="text-gray-500 text-sm">Your profile information</p>
          </div>
          {/* Profile Picture */}
          <div className="flex flex-col items-center relative mb-6">
            {/* Wrapper untuk image + icon */}
            <div className="w-24 h-24 rounded-full border-2 border-green-500 overflow-hidden relative">
              <Image
                key={selectedImg || user?.profile_pic} // key agar re-render setiap gambar berubah
                src={
                  selectedImg ||
                  user?.profile_pic ||
                  "/assets/images/avatar.png"
                }
                width={96}
                height={96}
                className="object-cover w-full h-full"
                alt="profile-pic"
              />
              {/* Icon camera di pojok kanan bawah */}
              <div className="absolute bottom-1 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <label htmlFor="avatar-upload">
                  <Camera className="w-4 h-4 text-gray-700" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500 hover:text-green-600">
              Click the camera icon to update your photo
            </p>
          </div>
          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={user?.nama}
                readOnly
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </form>
          {/* Account Info */}
          <div className="mt-8">
            <h4 className="text-md font-semibold text-gray-700 mb-3">
              Account Information
            </h4>
            <div className="flex justify-between text-sm text-gray-600 border-b py-2">
              <span>Member Since</span>
              <span>2025</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 py-2">
              <span>Account Status</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-sm font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
