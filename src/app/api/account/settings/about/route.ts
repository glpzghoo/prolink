import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { skill } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  const { about, skills } = await req.json();
  if (!process.env.ACCESS_TOKEN) {
    return NextResponse_NoEnv("ACCESS_TOKEN");
  }
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse_NoCookie();
  }
  if (!about && !skills) {
    return CustomNextResponse(false, "LACK_OF_INFO", "Мэдээлэл дутуу байна!", {
      about,
      skills,
    });
  }

  try {
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: verify.id },
      omit: { password: true },
    });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    if (!about && skills) {
      const updateUser = await prisma.user.update({
        where: { id: verify.id },
        data: {
          skill: {
            set: skills,
          },
        },
        include: { skill: true },
        omit: { password: true },
      });
      if (updateUser) {
        return CustomNextResponse(true, "SKILL_SUCCESS", "Хүсэлт амжилттай!", {
          updateUser,
        });
      }
    }
    if (about && !skills) {
      const updateUser = await prisma.user.update({
        where: { id: verify.id },
        data: {
          about,
        },
        include: { skill: true },
        omit: { password: true },
      });
      if (updateUser) {
        return CustomNextResponse(true, "ABOUT_SUCCESS", "Хүсэлт амжилттай!", {
          updateUser,
        });
      }
    }
    const updateUser = await prisma.user.update({
      where: { id: verify.id },
      data: {
        about,
        skill: {
          connect: skills,
        },
      },
      include: { skill: true },
      omit: { password: true },
    });
    if (updateUser) {
      return CustomNextResponse(true, "SUCCESS", "Хүсэлт амжилттай! ", {
        updateUser,
      });
    }
    return CustomNextResponse(false, "FAILED", "Хүсэлт амжилтгүй!", null);
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
