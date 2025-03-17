import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allposts = await prisma.job.findMany({
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
    });
    const filteredPosts = allposts.filter((post) => {
      return post.status === "ACTIVE" || post.status === "CLOSED";
    });
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", {
      posts: filteredPosts,
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");

    return NextResponse_CatchError(err);
  }
}
