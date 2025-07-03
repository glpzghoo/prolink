import { CustomUser } from "@/app/freelancer/FreelancerListClient";
import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const saved = body.map((user: CustomUser) => user.id);

    if (saved.length === 0) {
      return CustomNextResponse(
        false,
        "NO_USERS_PROVIDED",
        "Хадгалсан хэрэглэгч байхгүй байна!",
        null
      );
    }
    const users = await prisma.user.findMany({
      where: { id: { in: saved } },
      include: { skill: true, reviewee: true },
      omit: { password: true, email: true, phoneNumber: true },
    });
    if (users) {
      return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай!", [
        ...users,
      ]);
    }
    return CustomNextResponse(false, "REQUEST_FAILED", "Алдаа гарлаа!", null);
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
