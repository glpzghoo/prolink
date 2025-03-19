import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allposts = await prisma.job.findMany({
      where: { status: { in: ["ACTIVE", "CLOSED"] } },
      include: {
        skill: true,
        poster: {
          omit: { password: true, phoneNumber: true, email: true },
          include: {
            reviewee: { include: { reviewer: true } },
            reviewer: true,
          },
        },
        jobApplication: true,
      },
      orderBy: { postedAt: "desc" },
    });

    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      posts: allposts,
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
