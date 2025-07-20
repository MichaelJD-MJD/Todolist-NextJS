import cron from "node-cron";
import nodemailer from "nodemailer"
import { prisma } from "./prisma";

// Setup transporter dengan SendGrid SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey",
        pass : process.env.SEND_GRID_API_KEY
    }
})

// fungsi kirim ke email
async function sendReminderEmail(to: string, taskTitle: string, taskDescription: string){
    console.log("SENDREMINDEREMAIL DIJALANKAN");
    await transporter.sendMail({
      from: '"TodoApp Reminder" michaeljdarwin9@gmail.com>',
      to,
      subject: `Reminder: ${taskTitle}`,
      html: ` <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 24px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="color: #2f855a; margin-top: 0;">⏰ Task Reminder</h2>
      
      <p style="font-size: 16px; color: #333;"><strong>Task:</strong></p>
      <p style="font-size: 18px; color: #111; font-weight: bold;">${taskTitle}</p>

      <p style="font-size: 16px; color: #333;"><strong>Description:</strong></p>
      <p style="font-size: 16px; color: #444;">${taskDescription}</p>

      <hr style="margin: 24px 0;" />

      <p style="font-size: 14px; color: #666;">
        📌 Don’t forget to complete your task on time!
      </p>

      <p style="font-size: 14px; color: #999; margin-top: 24px;">
        This is an automated reminder from <strong>TodoApp</strong>.
      </p>
    </div>
  </div>`,
    });
}

// fungsi pengecekan dan kirim remainder
export async function checkAndSendReminders() {
    console.log("CHECKANDSENDREMINDRS DIJALANKAN");
    const now = new Date();

    const tasks = await prisma.task.findMany({
        where: {
            reminderAt: {
                lte: now,
            },
            reminderSent: false,
        },
        include: {
            user: true,
        }
    });

    for (const task of tasks){
        try {
            await sendReminderEmail(task.user.email, task.title, task.description);

            await prisma.task.update({
                where: {id: task.id},
                data: {reminderSent: true},
            });

             console.log(
               `Reminder sent to ${task.user.email} for task ${task.title}`
             );
        } catch (error) {
            console.error(`Failed to send reminder for task ${task.title}:`, error);
        }
    }
}

// jadwalkan setiap 1 menit (untuk testing, nanti ubah jadi hourly/daily)
cron.schedule("* * * * *", () => {
    console.log("Running reminder task...");
    checkAndSendReminders();
})