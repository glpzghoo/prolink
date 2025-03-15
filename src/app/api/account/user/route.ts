import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }
    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: verify.id },
      include: {
        skill: {
          include: {
            user: {
              omit: { password: true, phoneNumber: true, email: true },
            },
          },
        },
        reviewee: {
          include: {
            reviewee: {
              omit: { password: true, phoneNumber: true, email: true },
            },
          },
        },
        reviewer: true,
        featuredSkills: {
          include: {
            user: { omit: { password: true, phoneNumber: true, email: true } },
            skill: true,
          },
        },
      },
      omit: { password: true, phoneNumber: true, email: true },
    });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй",
        null
      );
    }
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай", {
      user,
    });
  } catch (err) {
    console.error(err, "Сервер эсвэл логик дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
