import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
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
    const post = await prisma.job.findUnique({
      where: { id },
      include: {
        poster: {
          omit: { password: true, phoneNumber: true, email: true },
          include: {
            reviewee: { include: { reviewer: true } },
            reviewer: true,
          },
        },
        skill: true,
        jobApplication: true,
      },
    });
    if (post) {
      const updateView = await prisma.job.update({
        where: { id },
        data: { jobPostView: post.jobPostView + 1 },
      });

      return CustomNextResponse(true, "REQUEST_SUCESS", "Хүсэлт амжилттай!", {
        post,
      });
    }
    return CustomNextResponse(
      false,
      "REQUEST_FAILED",
      "Хүсэлт амжилтгүй! Пост олдсонгүй!",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
