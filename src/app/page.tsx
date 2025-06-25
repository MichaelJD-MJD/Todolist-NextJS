import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen px-4 py-12 flex flex-col items-center justify-center max-w-screen-lg mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
          Get Started
        </h1>
        <p className="text-md sm:text-xl text-gray-500 font-light">
          Create Tasks &bull; Set Reminders &bull; Track Progress
        </p>
      </div>

      {/* Image */}
      <div className="mb-10 w-[40%]">
        <Image
          src="/assets/images/banner.png"
          alt="banner"
          width={800}
          height={450}
          className="w-full h-auto object-contain rounded-xl shadow-md"
        />
      </div>

      {/* Buttons */}
      <div className="w-[75%] max-w-sm mx-auto flex flex-col gap-4">
        <Link href="/login">
          <div className="py-3 text-center text-lg font-semibold text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
            LOGIN
          </div>
        </Link>
        <Link href="/register">
          <div className="py-3 text-center text-lg font-semibold text-white bg-gray-500 rounded-xl shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
            SIGN UP
          </div>
        </Link>
      </div>
    </div>
  );
}
