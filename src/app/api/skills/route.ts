import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({
        success: false,
        code: "NO_NAME_PROVIDED",
        message: "Нэр илгээгээгүй байна!",
        data: null,
      });
    }
    const newSkill = await prisma.skill.createMany({
      data: { name },
    });
    if (newSkill) {
      return NextResponse.json({
        success: true,
        code: "NEW_SKILL_ADDED",
        message: "Шинэ skill амжилттай нэмэгдлээ!",
        data: null,
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
    const skills = await prisma.skill.findMany();
    if (!skills) {
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
      data: { skills },
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
