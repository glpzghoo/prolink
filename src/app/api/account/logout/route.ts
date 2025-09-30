import { NextResponse } from "next/server";
export async function GET() {
  const response = NextResponse.json({
    success: true,
    code: "LOGOUT_SUCCESS",
    message: "Хэрэглэгч амжиллтай гарлаа!",
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("next-auth.session-token");
  return response;
}
