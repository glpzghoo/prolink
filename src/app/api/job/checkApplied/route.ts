import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return CustomNextResponse(
      false,
      "NO_ID_PROVIDED",
      "Таних тэмдэг байхгүй байна!",
      null
    );
  }
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv(`ACCESS_TOKEN`);
    }
    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        code: "REQUEST_FAILED",
        message: "Хүсэлт амжилтгүй!",
      });
    }
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const post = await prisma.job.findUnique({
      where: { id },
      include: {
        jobApplication: true,
      },
    });
    if (post) {
      const userApplied = post.jobApplication.some(
        (jo) => jo.freelancerId === verify.id
      );

      return CustomNextResponse(true, "REQUEST_SUCESS", "Хүсэлт амжилттай!", {
        userApplied,
      });
    }
    return CustomNextResponse(
      false,
      "JOB_NOT_FOUND",
      "Ажлын санал олдсонгүй!",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
