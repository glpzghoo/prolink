import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { reviewerId, revieweeId, rating } = await req.json();
  console.log({ reviewerId, revieweeId, rating });
  try {
    if (reviewerId && revieweeId && rating) {
      const reviewer = await prisma.user.findUnique({
        where: { id: reviewerId },
      });
      if (!reviewer) {
        return CustomNextResponse(
          false,
          "REVIEWER_DOES_NOT_EXIST",
          "Үнэлгээ өгөгчийг танисангүй!",
          null
        );
      }
      const reviewee = await prisma.user.findUnique({
        where: { id: revieweeId },
      });
      if (!reviewee) {
        return CustomNextResponse(
          false,
          "REVIEWER_DOES_NOT_EXIST",
          "Үнэлгээ авагчийг танисангүй!",
          null
        );
      }
      const newReview = await prisma.review.create({
        data: { reviewerId, revieweeId, rating },
      });
      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Хүсэлт амжилттай боллоо!",
        { newReview }
      );
    }
  } catch (err) {
    console.error(err, "");
    return NextResponse_CatchError(err);
  }
}
