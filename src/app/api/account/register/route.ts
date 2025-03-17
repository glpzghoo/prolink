import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
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
      omit: { password: true, phoneNumber: true, email: true },
    });
    const existingUser2 = await prisma.user.findUnique({
      where: { phoneNumber: body.phoneNumber },
      omit: { password: true, phoneNumber: true, email: true },
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
    const encryptedPass = await bcrypt.hash(password, Number(process.env.SALT));
    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: encryptedPass,
        role: body.companyName ? "CLIENT" : "FREELANCER",
      },
      omit: { password: true, phoneNumber: true, email: true },
    });
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
      data: null,
    });
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const { about, skills } = await req.json();
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse.json({
      success: false,
      code: "SOMETHING_WENt_WRONG",
      message: "Сервер эсвэл логик дээр асуудал гарлаа",
    });
  }
}
