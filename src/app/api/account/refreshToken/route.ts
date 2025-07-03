import { CustomNextResponse, NextResponse_CatchError, NextResponse_NoEnv } from '@/lib/responses';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
export async function GET(req: NextRequest) {
  try {
    if (!process.env.REFRESH_TOKEN || !process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv('BOTH_TOKEN');
    }
    const checkAccessToken = req.cookies.get('accessToken')?.value;
    if (checkAccessToken) {
      return CustomNextResponse(false, 'REQUEST_FAILED', 'Access Token сэргээх шаардлагагүй!', {});
    }
    const oldRefreshToken = req.cookies.get('refreshToken')?.value;
    if (!oldRefreshToken) {
      return CustomNextResponse(
        false,
        'NO_REFRESH_TOKEN',
        'Хэрэглэгч ахин нэвтрэх шаардлагатай',
        null
      );
    }

    const verify = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: verify.id } });

    if (!user) {
      return CustomNextResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role, companyName: user.companyName },
      process.env.ACCESS_TOKEN,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role, companyName: user.companyName },
      process.env.REFRESH_TOKEN,
      { expiresIn: '48h' }
    );

    const response = NextResponse.json({
      success: true,
      code: 'TOKEN_REFRESHED',
      message: 'Хэрэглэгчийн эрхийг амжилттай сэргээлээ',
      data: {},
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
    });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 48,
    });
    return response;
  } catch (err) {
    console.error(err, 'Сервер дээр асуудал гарлаа!');
    const response = NextResponse_CatchError(err);
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}
