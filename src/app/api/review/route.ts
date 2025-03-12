import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { message, revieweeId, rating } = await req.json();
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }
    if (!message) {
      return CustomNextResponse(
        false,
        "NO_MESSAGE",
        "Сэтгэгдэл байхгүй байна!",
        null
      );
    }
    if (!rating) {
      return CustomNextResponse(
        false,
        "NO_Rating",
        "Үнэлгээ байхгүй байна!",
        null
      );
    }
    const reviewee = await prisma.user.findUnique({
      where: { id: revieweeId },
    });
    if (!reviewee) {
      return CustomNextResponse(
        false,
        "REVIEWEE_DOES_NOT_EXIST",
        "Үнэлгээ авагчийг танисангүй!",
        null
      );
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const newReview = await prisma.review.create({
      data: { rating, message, revieweeId, reviewerId: verify.id },
    });
    return CustomNextResponse(
      true,
      "NEW_REVIEW_ADDED",
      "Үнэлгээ амжилттай постлолоо!",
      { newReview }
    );
  } catch (err) {
    console.error(err, "");
    return NextResponse_CatchError(err);
  }
}
