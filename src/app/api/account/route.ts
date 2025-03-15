import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      return NextResponse.json({
        success: true,
        userExist: !!userExist,
        message: "Хэрэглэгч бүртгэлтэй байна!",
        code: "USER_FOUND",
        data: {
          name: userExist.firstName,
        },
      });
    }
    return NextResponse.json({
      success: true,
      userExist: !!userExist,
      message: "Хэрэглэгч бүртгэлгүй байна!",
      code: "USER_NOT_FOUND",
    });
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа!");
    return NextResponse.json({
      success: false,
      message: "server aldaa",
    });
  }
}
export async function GET(req: NextRequest) {
  try {
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      return NextResponse.json({
        success: false,
        message: "Сервэрийн тохиргооны алдаа (ENV)",
        code: "NO_ENV",
        data: {},
      });
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        message: "user is not signed in",
        code: "USER_NOT_SIGNED",
        data: {},
      });
    }
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    if (!verified) {
      return NextResponse.json({
        success: false,
        message: "Ахин нэвтэрнэ үү!",
        code: "TOKEN_EXPIRED",
        data: {},
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: verified.id,
      },
      include: { skill: true },
      omit: { password: true },
    });
    if (user) {
      return NextResponse.json({
        message: "Тавтай морил",
        code: "SUCCESS",
        data: { informations: user },
        success: true,
      });
    }
    return NextResponse.json({
      code: "USER_NOT_FOUND",
      message: "user does not exist",
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
}
