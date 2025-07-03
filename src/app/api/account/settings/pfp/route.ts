import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from '@/lib/responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
export async function POST(req: NextRequest) {
  try {
    const { pfp, password } = await req.json();
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv('ACCESS_TOKEN');
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: verify.id } });
    if (!user) {
      return CustomNextResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй', null);
    }
    const pas = await bcrypt.compare(password, user.password);
    if (!pas) {
      return CustomNextResponse(false, 'INCORRECT_PASSWORD', 'Нууц үг буруу байна!', null);
    }
    const updateUserPfp = await prisma.user.update({
      where: { id: user.id },
      data: { pfp },
      omit: { password: true, email: true, phoneNumber: true },
    });
    return CustomNextResponse(true, 'REQUEST_SUCCESS', 'Профайл зураг амжилттай солигдлоо!', {
      user: updateUserPfp,
    });
  } catch (err) {
    console.error(err, 'Сервер дээр асуудал гарлаа!');
    return NextResponse_CatchError(err);
  }
}
