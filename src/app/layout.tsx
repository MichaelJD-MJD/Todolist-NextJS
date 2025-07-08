import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./provider";

export const metadata: Metadata = {
  title: "Todolist NextJS",
  description: "Todolist NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <UserProvider>{children}</UserProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
