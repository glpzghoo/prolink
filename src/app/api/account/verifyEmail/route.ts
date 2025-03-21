import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function GET(req: NextRequest) {
  const tenMinAgo = new Date(new Date().getTime() - 600000);

  await prisma.otp.deleteMany({
    where: { createdAt: { lte: tenMinAgo } },
  });
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: verify.id } });
    if (!user) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Хэрэглэгч олдсолгүй",
        null
      );
    }
    const otp = Math.round(Math.random() * 899999999 + 100000000);
    const newOtp = await prisma.otp.create({
      data: { otp, email: user.email },
    });
    await transporter.sendMail({
      from: "Team HexaCode - Prolink", // sender address
      to: user.email, // list of receivers
      subject: "ProLink - Таны баталгаажуулах линк", // Subject line
      text: "Freelancing App / Team HexaCode", // plain text body
      html: `<b>Сайн байна уу! ${
        user.role === "CLIENT" ? user.companyName : user.firstName
      }.</b><p>Та уг линкээр орон хаягаа баталгаажуулаарай! Линк 10 минут л хүчинтэй! ${
        process.env.BASE_URL
      }/verify?otp=${otp}
        }</p>`, // html body
    });
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Майл илгээлээ~!", {
      id: newOtp.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
export async function POST(req: NextRequest) {
  try {
    const otp = req.nextUrl.searchParams.get("otp");
    const tenMinAgo = new Date(new Date().getTime() - 600000);

    await prisma.otp.deleteMany({
      where: { createdAt: { lte: tenMinAgo } },
    });
    if (!otp) {
      return CustomNextResponse(
        false,
        "REQUEST FAILED",
        "Код олдсонгүй!",
        null
      );
    }

    const find = await prisma.otp.findUnique({ where: { otp: Number(otp) } });

    if (!find) {
      return CustomNextResponse(
        false,
        "REQUEST FAILED",
        "Хүчингүй линк!",
        null
      );
    }

    const user = await prisma.user.update({
      where: { email: find.email },
      data: { emailVerified: true },
      omit: { password: true, email: true, phoneNumber: true },
    });
    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Амжилттай баталгаажлаа!",
      { user }
    );
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
