import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  if (!process.env.SALT) {
    return NextResponse.json({
      success: false,
      message: "Сервэрийн тохиргооны алдаа (ENV)",
      code: "NO_ENV",
      data: {},
    });
  }
  try {
    const existingUser1 = await prisma.user.findUnique({
      where: { email: body.email },
    });
    const existingUser2 = await prisma.user.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    if (existingUser1) {
      return NextResponse.json({
        success: false,
        code: "USER_EXISTS",
        message: "Email бүртгэлтэй байна!",
        data: { name: existingUser1.id },
      });
    }
    if (existingUser2) {
      return NextResponse.json({
        success: false,
        code: "USER_EXISTS",
        message: "Утасны дугаар бүртгэлтэй байна!",
        data: { name: existingUser2.id },
      });
    }

    const { password } = body;
    console.log(password);
    const encryptedPass = await bcrypt.hash(password, Number(process.env.SALT));
    const newUser = await prisma.user.create({
      data: { ...body, password: encryptedPass },
    });
    console.log(newUser);
    return NextResponse.json({
      success: true,
      message: "Амжилттай бүртгэгдлээ!",
      code: "NEW_USER",
      data: { userId: newUser.id },
    });
  } catch (err) {
    console.error("Сервер дээр алдаа гарлаа!");
    return NextResponse.json({
      success: false,
      message: "Сервер дээр алдаа гарлаа!",
      code: "API_ERROR",
      data: {},
    });
  }
}
