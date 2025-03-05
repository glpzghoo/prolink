import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const otp = Math.floor(Math.random() * 899999 + 100000);
    await transporter.sendMail({
      from: "Team HexaCode", // sender address
      to: email, // list of receivers
      subject: "Нууц үгээ солих 1 удаагийн код", // Subject line
      text: "Freelancing App / Team HexaCode", // plain text body
      html: `<b>Сайн байна уу! ${user?.firstName}.</b><p> Таны нэг удаагийн код: ${otp}</p>`, // html body
    });
    const newOtp = await prisma.otp.create({
      data: { otp, email },
    });
    return NextResponse.json({
      success: true,
      message: "Нэг удаагийн код амжилттай илгээлээ!",
      code: "CODE_SUCCESSFULLY_SENT",
      data: { id: newOtp.id },
    });
  } catch (err) {
    console.error(err, "aldaa");
  }
}

export async function PATCH(req: NextRequest) {
  const { otp, id, email, password } = await req.json();
  if (!process.env.SALT) {
    return NextResponse.json({
      success: false,
      message: "Сервэрийн тохиргооны алдаа (ENV)",
      code: "NO_ENV",
      data: {},
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const getOTP = await prisma.otp.findFirst({
      where: { otp },
    });
    if (user?.email === getOTP?.email) {
      const encryptedPass = await bcrypt.hash(
        password,
        Number(process.env.SALT)
      );
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          password: encryptedPass,
        },
      });
      return NextResponse.json({
        code: "OTP_MATCHED",
        message: "Нууц үг амжилттай солигдлоо.",
        success: true,
      });
    }
    return NextResponse.json({
      code: "OTP_DIDN'T_MATCHED",
      message: "Нэг удаагийн код буруу байна!",
      success: false,
    });
  } catch (err) {
    console.error(err, "Сервэрийн алдаа");
    return NextResponse.json({
      code: "SERVER_ERROR",
      message: "Сервэрийн алдаа",
      success: false,
    });
  }
  return NextResponse.json({ message: "hi" });
}
