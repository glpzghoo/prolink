import { prisma } from "@/lib/prisma";
import { CustomNextResponse, NextResponse_CatchError } from "@/lib/responses";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { skill: true, reviewee: true },
      omit: { password: true, phoneNumber: true, email: true },
    });
    if (!users) {
      return CustomNextResponse(
        false,
        "ERROR_FIINDING_USERS",
        "Хэрэглэгчдийг олоход алдаа гарлаа",
        null
      );
    }
    return CustomNextResponse(true, "REQUESR_SUCCESS", "Хүсэлттэй амжилттай!", {
      users,
    });
  } catch (err) {
    console.error(err, "Сервер дээр алдаа гарлаа1");
    return NextResponse_CatchError(err);
  }
}
