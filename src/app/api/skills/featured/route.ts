import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { skill, detail, startedAt, present, endedAt } = await req.json();
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv(`ACCESS_TOKEN`);
    }
    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: verify.id } });
    if (user) {
      if (skill && detail && startedAt && (present || endedAt)) {
        if (present) {
          const NewFeaturedSkill = await prisma.featuredSkills.create({
            data: {
              skillId: skill,
              detail,
              startedAt,
              present,
              userId: verify.id,
            },
          });
          return CustomNextResponse(
            true,
            "FEATURED_SKILL_ADDED",
            "Онцгой ур чадварыг амжилттай нэмлээ!",
            { NewFeaturedSkill }
          );
        }

        const NewFeaturedSkill = await prisma.featuredSkills.create({
          data: {
            skillId: skill,
            detail,
            startedAt,
            present,
            endedAt,
            userId: verify.id,
          },
        });
        return CustomNextResponse(
          true,
          "FEATURED_SKILL_ADDED",
          "Онцгой ур чадварыг амжилттай нэмлээ!",
          { NewFeaturedSkill }
        );
      }
    }
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
    return NextResponse_CatchError(err);
  }
}
export async function GET(req: NextRequest) {
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv(`ACCESS_TOKEN`);
    }
    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const UserFeaturedSkills = await prisma.user.findUnique({
      where: { id: verify.id },
      include: {
        featuredSkills: {
          include: { user: true, skill: true },
        },
      },
    });
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      user: UserFeaturedSkills,
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
  }
}
