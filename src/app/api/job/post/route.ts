import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
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
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      return NextResponse.json({
        success: false,
        message: "Сервэрийн тохиргооны алдаа (ENV)",
        code: "NO_ENV",
        data: {},
      });
    }
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        message: "Хэрэглэгч нэвтрээгүй байна!",
        code: "USER_NOT_SIGNED",
        data: {},
      });
    }
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };
    if (!verified) {
      return NextResponse.json({
        success: false,
        message: "Ахин нэвтэрнэ үү!",
        code: "TOKEN_EXPIRED",
        data: {},
      });
    }

    const post = await prisma.job.findUnique({
      where: { id },
    });

    if (post?.posterId !== verified.id) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Таньд уг үйлдлийг хийх эрх байхгүй байна!",
        null
      );
    }
    if (post) {
      const deleteJob = await prisma.job.delete({
        where: { id },
      });

      return CustomNextResponse(
        true,
        "REQUEST_SUCESS",
        "Ажлын санал амжилттай устгагдлаа!",
        {
          deleteJob,
        }
      );
    }
    return CustomNextResponse(
      false,
      "REQUEST_FAILED",
      "Хүсэлт амжилтгүй! Ажлын санал устгагдсангүй!",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}

export async function PUT(req: NextRequest) {
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
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      return NextResponse.json({
        success: false,
        message: "Серверийн тохиргооны алдаа (ENV)",
        code: "NO_ENV",
        data: {},
      });
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        message: "Хэрэглэгч нэвтрээгүй байна!",
        code: "USER_NOT_SIGNED",
        data: {},
      });
    }

    let verified;
    try {
      verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
        id: string;
      };
    } catch (err) {
      return NextResponse.json({
        success: false,
        message: "Ахин нэвтэрнэ үү!",
        code: "TOKEN_EXPIRED",
        data: {},
      });
    }

    const post = await prisma.job.findUnique({
      where: { id },
    });

    if (!post) {
      return CustomNextResponse(
        false,
        "NOT_FOUND",
        "Ажлын санал олдсонгүй!",
        null
      );
    }

    if (post.posterId !== verified.id) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Таньд уг үйлдлийг хийх эрх байхгүй байна!",
        null
      );
    }

    const updateJob = await prisma.job.update({
      where: { id },
      data: {
        updatedAt: new Date(),
      },
    });

    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Ажлын санал амжилттай update хийгдлээ!",
      { updateJob }
    );
  } catch (err) {
    console.error("Сервер дээр асуудал гарлаа:", err);
    return NextResponse_CatchError(err);
  }
}
