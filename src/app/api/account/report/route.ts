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
    const { reason } = await req.json();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomNextResponse(
        false,
        "FALSE_REQUEST",
        "Таних тэмдэг алга",
        null
      );
    }
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: {
        id: verified.id,
      },
      omit: { password: true, email: true },
    });
    if (!user) {
      return NextResponse.json({
        code: "USER_NOT_FOUND",
        message: "Хэрэглэгч олдсонгүй",
        success: false,
      });
    }
    if (verified.id === id) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Өөрийгөө мэдэгдэх боломжгүй",
        null
      );
    }
    const existingReport = await prisma.reportUser.findFirst({
      where: {
        reporterUserId: verified.id,
        reportedUserId: id,
        resolved: false,
      },
    });
    if (existingReport) {
      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Аль хэдий нь мэдэгдэл явуулсан байна. Спам хийхгүй байхыг хүсье!",
        existingReport
      );
    }
    const report = await prisma.reportUser.create({
      data: { reporterUserId: verified.id, reportedUserId: id, reason },
    });
    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Амжилттай илгээлээ. Бид шалгаж үзээд, тань лүү үр дүнг майлээр илгээх болно. Баярлалаа!",
      report
    );
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
