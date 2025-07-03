import { prisma } from '@/lib/prisma';
import { CustomNextResponse } from '@/lib/responses';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return CustomNextResponse(false, 'ID_NOT_PROVIDED', 'Буруу ID', null);
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true, phoneNumber: true, email: true },
    });
    if (!user) {
      return CustomNextResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (accessToken) {
      try {
        const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN!) as {
          id: string;
        };
        if (user.id === verify.id) {
          return NextResponse.json({ message: 'nice try' });
        }
      } catch (err) {
        console.error(err, 'Токен хүчингүй!');
      }
    }
    const view = await prisma.user.update({
      where: { id },
      data: { profileViews: user?.profileViews + 1 },
      omit: { password: true, phoneNumber: true, email: true },
    });
    return CustomNextResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай биеллээ!', {
      new: view.profileViews,
    });
  } catch (err) {
    console.error(err, 'Сервер дээр алдаа гарлаа!');
  }
}
