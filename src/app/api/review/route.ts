import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function POST(req: NextRequest) {
  try {
    const { message, revieweeId, rating } = await req.json();
    if (!process.env.ACCESS_TOKEN || !process.env.BASE_URL) {
      return NextResponse_NoEnv("ACCESS_TOKEN or BASE_URL");
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
      omit: { password: true, phoneNumber: true },
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
      companyName: string;
    };
    const reviewer = await prisma.user.findUnique({
      where: { id: verify.id },
      include: { reviewer: true },
      omit: { password: true, phoneNumber: true },
    });

    if (!reviewer) {
      return CustomNextResponse(
        false,
        "REVIEWER_DOES_NOT_EXIST",
        "Үнэлгээ өгөгчийг танисангүй!",
        null
      );
    }
    if (revieweeId === reviewer.id) {
      return CustomNextResponse(
        false,
        "CAN_NOT_RATE_YOURSELF",
        "Өөртөө үнэлгээ өгч болохгүй!",
        null
      );
    }
    if (reviewee.role === reviewer.role) {
      return CustomNextResponse(
        false,
        "NO_PERMISSION",
        "Зөвхөн байгууллага мэрэгжилтэнд, мэргэжилтэн байгууллагад үнэлгээ өгөх эрхтэй!",
        null
      );
    }

    const findreview = await prisma.review.findFirst({
      where: { revieweeId: revieweeId, reviewerId: reviewer.id },
    });
    if (findreview) {
      return CustomNextResponse(
        false,
        "ALREADY_REVIEWED_USER",
        "Аль хэдийн үнэлгээ үзүүлсэн байна!",
        null
      );
    }

    const checkUsers1 = await prisma.jobApplication.findFirst({
      where: {
        clientId: reviewee.id,
        freelancerId: reviewer.id,
        clientStatus: { in: ["accepted", "denied"] },
      },
    });
    const checkUsers2 = await prisma.jobApplication.findFirst({
      where: {
        clientId: reviewer.id,
        freelancerId: reviewee.id,
        clientStatus: { in: ["accepted", "denied"] },
      },
    });

    if (!checkUsers1 && !checkUsers2) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Уг хэрэглэгчтэй хамтарч ажиллаж байсан түүх олдсонгүй!",
        null
      );
    }

    if (reviewer.companyName && !reviewee.companyName) {
      const newReview = await prisma.review.create({
        data: { rating, message, revieweeId, reviewerId: verify.id },
      });
      await transporter.sendMail({
        from: `"Team HexaCode" <${process.env.EMAIL}>`, // sender address
        to: reviewee.email, // list of receivers
        subject: "ProLink - Шинэ үнэлгээ!", // Subject line
        text: "Freelancing App / Team HexaCode", // plain text body
        html: `<b>Сайн байна уу! ${
          reviewee.role === `CLIENT` ? reviewee.companyName : reviewee.firstName
        }.</b><p>Таньд профайл дээр ${
          reviewer.role === `CLIENT` ? reviewer.companyName : reviewer.firstName
        } үнэлгээ үлдээлээ. Холбоосоор орж харна уу! ${
          reviewee.role === `CLIENT`
            ? `${process.env.BASE_URL}/client/${reviewee.id}`
            : `${process.env.BASE_URL}/freelancer/${reviewee.id}`
        }</p>`, // html body
      });
      return CustomNextResponse(
        true,
        "NEW_REVIEW_ADDED",
        "Үнэлгээ амжилттай постлолоо!",
        { newReview }
      );
    }
    if (!reviewer.companyName && reviewee.companyName) {
      const newReview = await prisma.review.create({
        data: { rating, message, revieweeId, reviewerId: verify.id },
      });
      await transporter.sendMail({
        from: `"Team HexaCode" <${process.env.EMAIL}>`, // sender address
        to: reviewee.email, // list of receivers
        subject: "ProLink - Шинэ үнэлгээ!", // Subject line
        text: "Freelancing App / Team HexaCode", // plain text body
        html: `<b>Сайн байна уу! ${
          reviewee.role === `CLIENT` ? reviewee.companyName : reviewee.firstName
        }.</b><p>Таньд профайл дээр ${
          reviewer.role === `CLIENT` ? reviewer.companyName : reviewer.firstName
        } үнэлгээ үлдээлээ. Холбоосоор орж харна уу! ${
          reviewee.role === `CLIENT`
            ? `${process.env.BASE_URL}/client/${reviewee.id}`
            : `${process.env.BASE_URL}/freelancer/${reviewee.id}`
        }</p>`, // html body
      });
      return CustomNextResponse(
        true,
        "NEW_REVIEW_ADDED",
        "Үнэлгээ амжилттай постлолоо!",
        { newReview }
      );
    }
    return CustomNextResponse(
      false,
      "NO_PERMISSION",
      "Зөвхөн байгууллага мэрэгжилтэнд, мэргэжилтэн байгууллагад үнэлгээ өгөх эрхтэй!",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
