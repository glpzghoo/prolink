import { getServerSession } from "next-auth";
import { CustomNextResponse } from "@/lib/responses";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/providers/google/authOption";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
    return NextResponse.json({
      success: false,
      message: "Сервэрийн тохиргооны алдаа (ENV)",
      code: "NO_ENV",
      data: {},
    });
  }
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/account", req.url));
  }
  const email = session.user.email;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return CustomNextResponse(
      false,
      "USER_NOT_FOUND",
      "Хэрэглэгч олдсонгүй~!",
      null
    );
  }
  const accessToken = jwt.sign(
    { id: user.id, companyName: user.companyName, role: user.role },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, {
    expiresIn: "4h",
  });
  const { password, ...userInfo } = user;
  const response = NextResponse.redirect(
    new URL("/account/settings/application", req.url)
  );
  const response2 = response.json();
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
}
