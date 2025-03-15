import { prisma } from "@/lib/prisma";
import { NextResponse_NoCookie, NextResponse_NoEnv } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({
        success: false,
        code: "NO_NAME_PROVIDED",
        message: "Нэр илгээгээгүй байна!",
        data: null,
      });
    }
    // const catExist = await prisma.skill.findUnique({ where: { name } });
    // if (catExist) {
    //   return NextResponse.json({
    //     success: false,
    //     code: "SKILL_EXISTS",
    //     message: "Skill аль хэдийн датабаз дээр байна!",
    //     data: { catExist },
    //   });
    // }
    const newSkill = await prisma.skill.createMany({
      data: body,
    });
    if (newSkill) {
      return NextResponse.json({
        success: true,
        code: "NEW_SKILL_ADDED",
        message: "Шинэ skill амжилттай нэмэгдлээ!",
        data: newSkill,
      });
    }
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse.json({
      success: false,
      code: "SOMETHING_WENT_WRONG",
      message: "Сервер эсвэл логик дээр асуудал гарлаа",
      data: null,
    });
  }
}
export async function GET() {
  try {
    const allSkills = await prisma.skill.findMany({
      orderBy: { name: "asc" },
    });
    if (!allSkills) {
      return NextResponse.json({
        success: false,
        code: "REQUEST_FAILED",
        message: "Хүсэлт амжилтгүй боллоо!",
        data: null,
      });
    }
    return NextResponse.json({
      success: true,
      code: "REQUEST_SUCCESS",
      message: "Хүсэлт амжилттай боллоо!",
      data: { skills: allSkills },
    });
  } catch (err) {
    console.error(err, "");
    return NextResponse.json({
      success: false,
      code: "SOMETHING_WENT_WRONG",
      message: "Сервер эсвэл логик дээр асуудал гарлаа",
      data: null,
    });
  }
}
