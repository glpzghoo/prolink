import { prisma } from "@/lib/prisma";
import { CustomNextResponse } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    const view = await prisma.user.update({
      where: { id },
      data: { profileViews: user?.profileViews + 1 },
    });
    const { password, ...userInfo } = view;
    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Хүсэлт амжилттай биеллээ!",
      { new: userInfo.profileViews }
    );
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа!");
  }
}
