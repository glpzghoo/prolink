import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function POST(req: NextRequest) {
  const { id } = await req.json();
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
    const profileOwner = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгчийг олсонгүй!",
        null
      );
    }
    if (!profileOwner) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Профайл олдсонгүй!",
        null
      );
    }
    await transporter.sendMail({
      from: "Team HexaCode - Prolink", // sender address
      to: profileOwner.email, // list of receivers
      subject: "ProLink - Таньд ажлын урилга ирлээ!", // Subject line
      text: "Freelancing App / Team HexaCode", // plain text body
      html: `<b>Сайн байна уу! ${
        profileOwner.firstName
      }.</b><p>Таньд ажлын урилга ирлээ. Холбоосоор орон холбогдоно уу! ${
        user.companyName
          ? `http://localhost:3000/client/${user.id}`
          : `http://localhost:3000/freelancer/${user.id}`
      }</p>`, // html body
    });
    const { password, ...userIfo } = user;
    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Урилга амжилттай илгээлээ",
      { user: userIfo }
    );
  } catch (err) {
    console.error(err, "");
    NextResponse_CatchError(err);
  }
}
