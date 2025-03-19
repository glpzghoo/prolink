import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv(`ACCESS_TOKEN`);
    }
    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
      role: string;
    };

    if (verify.role === "CLIENT") {
      const user = await prisma.user.findUnique({
        where: { id: verify.id },
        include: {
          clientJobApplication: {
            include: {
              job: { include: { skill: true } },
              freelancer: { include: { reviewee: true } },
            },
          },
        },
        omit: { password: true },
      });

      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Ажил олгогчийн анкетүүд амжилттай татлаа!",
        {
          user,
        }
      );
    } else if (verify.role === "FREELANCER") {
      const user = await prisma.user.findUnique({
        where: { id: verify.id },
        include: {
          freelancerJobApplication: {
            include: {
              job: { include: { skill: true } },
              client: { include: { reviewee: true } },
            },
          },
        },
        omit: { password: true },
      });

      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Ажил горилогчийн анкетүүд амжилттай татлаа!",
        {
          user,
        }
      );
    }
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomNextResponse(
        false,
        "NO_ID_PROVIDED",
        "Хүсэлт амжилтгүй! ID олдсонгүй!",
        null
      );
    }
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

    const jobApplication = await prisma.jobApplication.delete({
      where: { id },
    });

    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Амжилттай устгалаа!",
      jobApplication
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { jobApplicationId, status } = await req.json();
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS TOKEN");
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    const jobApplication = await prisma.jobApplication.update({
      where: { id: jobApplicationId },
      data: { accepted: status },
    });
    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Амжилттай шинэчлэгдлээ!",
      jobApplication
    );
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа");
    return NextResponse_CatchError(err);
  }
}
