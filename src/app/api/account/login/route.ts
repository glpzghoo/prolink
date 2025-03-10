import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  const { email, password1 } = await req.json();
  if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
    return NextResponse.json({
      success: false,
      message: "Сервэрийн тохиргооны алдаа (ENV)",
      code: "NO_ENV",
      data: {},
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { skill: true },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
        code: "USER_NOT_FOUND",
      });
    }
    const validPass = await bcrypt.compare(password1, user.password);
    if (!validPass) {
      return NextResponse.json({
        success: false,
        message: "Нууц үг буруу байна!",
        code: "INCORRECT_PASSWORD",
      });
    }
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "4h" }
    );
    const { password, ...userInfo } = user;
    const response = NextResponse.json({
      success: true,
      message: "Тавтай морил",
      data: { user: userInfo },
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 4,
    });
    return response;
  } catch (err) {
    console.error(err, "Серверийн алдаа");
    return NextResponse.json({
      success: false,
      message: "Серверийн алдаа",
    });
  }
}
