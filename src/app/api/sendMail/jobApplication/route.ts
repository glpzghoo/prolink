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
  try {
    const id = req.nextUrl.searchParams.get("id");
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
    const freelancer = await prisma.user.findUnique({
      where: { id: verify.id },
    });
    if (!freelancer) {
      return CustomNextResponse(
        false,
        "USER_FOUND",
        "Хэрэглэгчийг танисангүй!",
        null
      );
    } else if (freelancer.role === "CLIENT") {
      return CustomNextResponse(
        false,
        "NOT_FREELANCER",
        "Компани ажлын хүсэлт тавьж болохгүй!",
        null
      );
    }
    if (!id) {
      return CustomNextResponse(
        false,
        "NO_ID_PROVIDED",
        "Таних тэмдэг алга!",
        null
      );
    }
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return CustomNextResponse(false, "JOB_NOT_FOUND", "Зар олдсонгүй!", null);
    } else if (job.status === "CLOSED" || job.status === "DRAFT") {
      return CustomNextResponse(
        false,
        "JOB_STATUS_NOT_ACTIVE",
        "Идэвхигүй заранд хүсэлт гаргах боломжгүй!",
        null
      );
    }

    const newJobApplication = await prisma.jobApplication.create({
      data: { jobId: id, freelancerId: verify.id, clientId: job.posterId },
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
