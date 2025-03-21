import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET() {
  if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
    return NextResponse.json({
      success: false,
      message: "Сервэрийн тохиргооны алдаа (ENV)",
      code: "NO_ENV",
      data: {},
    });
  }

  const accessToken = jwt.sign({ user: "" }, process.env.ACCESS_TOKEN, {
    expiresIn: "1s",
  });
  const refreshToken = jwt.sign({ user: "" }, process.env.REFRESH_TOKEN, {
    expiresIn: "1s",
  });
  const response = NextResponse.json({
    success: true,
    code: "LOGOUT_SUCCESS",
    message: "Хэрэглэгч амжиллтай гарлаа!",
  });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1,
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1,
  });
  response.cookies.set("next-auth.session-token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1,
  });
  return response;
}
