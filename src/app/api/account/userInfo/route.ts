import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return CustomNextResponse(false, "ID_NOT_PROVIDED", "Буруу ID", null);
  }
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй",
        null
      );
    }
    return CustomNextResponse(true, "REQUEST_SUCCESS", "Хүсэлт амжилттай", {
      user,
    });
  } catch (err) {
    console.log(err, "Сервер эсвэл логик дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
