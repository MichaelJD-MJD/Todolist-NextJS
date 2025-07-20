// app/api/cron/route.ts
import { NextResponse } from "next/server";
import { checkAndSendReminders } from "@/lib/reminder.cron";

let cronStarted = false;

export async function GET() {
  if (!cronStarted) {
    checkAndSendReminders();
    cronStarted = true;
    console.log("🔁 Cron started from API route");
  }
  return NextResponse.json({
    message: "Cron started (if not already running)",
  });
}
