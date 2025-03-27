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
  host: "smtp.zoho.com",
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
    const user = await prisma.user.findUnique({
      where: { id: verify.id },
      omit: { password: true, email: true },
    });
    const profileOwner = await prisma.user.findUnique({
      where: { id },
      omit: { password: true, phoneNumber: true },
    });
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
    if (user.role === profileOwner.role) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Role адилхан байна!",
        null
      );
    } else if (user.role === "FREELANCER") {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Freelancer холбоо барих хүсэлт илгээх боломжгүй!",
        null
      );
    }
    await transporter.sendMail({
      from: "Team HexaCode - Prolink", // sender address
      to: profileOwner.email, // list of receivers
      subject: "ProLink - Холбоо барих хүсэлт ирлээ!", // Subject line
      text: "Freelancing App / Team HexaCode", // plain text body
      html: `<b>  Сайн байна уу! ${profileOwner.firstName}.
      </b>
      <h3>Таньд холбоо барих хүсэлт ирлээ. Холбоосоор орон холбогдоно уу!</h3>
      <br>
      <strong>
      <a href="${`${process.env.BASE_URL}/client/${user.id}`}" target="_blank">${
        profileOwner.companyName
      }</a>
      <p>Утасны дугаар: ${user.phoneNumber}</p>
      </strong>`, // html body
    });

    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Урилга амжилттай илгээлээ.",
      { user }
    );
  } catch (err) {
    console.error(err, "");
    NextResponse_CatchError(err);
  }
}
