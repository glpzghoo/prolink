import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
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
        skill: { include: { job: true } },
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
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    // console.log(id);
    if (!id) {
      return CustomNextResponse(false, "NO_ID", "Таних тэмдэг алга", null);
    }
    // return NextResponse.json({ id });
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: verified.id } });
    const job = await prisma.job.findUnique({ where: { id } });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    if (!job) {
      return CustomNextResponse(false, "JOB_NOT_FOUND", "Зар олдсонгүй!", null);
    }
    if (user.role === "FREELANCER") {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Зөвшөөрөлгүй үйлдэл!",
        null
      );
    }

    if (user.id !== job.posterId) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Зөвшөөрөлгүй үйлдэл!",
        null
      );
    }

    const updateJobStatus = await prisma.job.update({
      where: { id: job.id },
      data: { status: job.status === "ACTIVE" ? "CLOSED" : "ACTIVE" },
    });

    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Төлөв амжилттай өөрчлөгдлөө!",
      { job: updateJobStatus }
    );
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа!");
    NextResponse_CatchError(err);
  }
}
export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { description, title } = await req.json();
    if (!id) {
      return CustomNextResponse(false, "NO_ID", "Таних тэмдэг алга", null);
    }
    // return NextResponse.json({ id });
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: verified.id } });
    const job = await prisma.job.findUnique({ where: { id } });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    if (!job) {
      return CustomNextResponse(false, "JOB_NOT_FOUND", "Зар олдсонгүй!", null);
    }
    if (user.role === "FREELANCER") {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Зөвшөөрөлгүй үйлдэл!",
        null
      );
    }

    if (user.id !== job.posterId) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Зөвшөөрөлгүй үйлдэл!",
        null
      );
    }

    const updateJob = await prisma.job.update({
      where: { id: job.id },
      data: { title, description },
    });
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Амжилттай засагдлаа!", {
      job: updateJob,
    });
  } catch (err) {
    console.error(err);
  }
}
