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
    const user = await prisma.user.findUnique({
      where: { id: verify.id },
      include: { featuredSkills: true },
      omit: { password: true, phoneNumber: true, email: true },
    });
    if (user) {
      const existingFeature = user.featuredSkills.some((ski) => {
        return ski.skillId === skill;
      });
      if (existingFeature) {
        return CustomNextResponse(
          false,
          "FEATUREDSKILL_ALREADY_EXIST",
          "Онцгойлсон skill аль хэдийн оруулсан байна!",
          null
        );
      }

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
    return CustomNextResponse(
      false,
      "FEATURED_SKILL_NOT_ADDED",
      "Мэдээлэл дутуу байна!",
      null
    );
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
          include: {
            user: {
              omit: { password: true, phoneNumber: true, email: true },
            },
            skill: true,
          },
        },
      },
      omit: { password: true, phoneNumber: true, email: true },
    });
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      user: UserFeaturedSkills,
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomNextResponse(
        false,
        "NO_ID_PROVIDED",
        "Хүсэлт амжилтгүй! Таних тэмдэг олдсонгүй!",
        null
      );
    }
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const featuredSkill = await prisma.featuredSkills.findUnique({
      where: { id },
    });
    if (featuredSkill?.userId === verify.id) {
      const deleteskill = await prisma.featuredSkills.delete({ where: { id } });

      return CustomNextResponse(
        true,
        "SKILL_SUCCESSFULLY_DELETED",
        "Хүсэлт амжилттай",
        { skill: deleteskill }
      );
    }
    return CustomNextResponse(
      false,
      "NOT_AUTHORIZED",
      "Таньд энэ үйлдлийг хийх эрх байхгүй байна!",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа");
    return NextResponse_CatchError(err);
  }
}
