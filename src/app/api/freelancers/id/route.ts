import { prisma } from '@/lib/prisma';
import { CustomNextResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return CustomNextResponse(false, 'WRONG_ID', 'ID шаардлагатай!', null);
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true, email: true, phoneNumber: true },
      include: {
        skill: {
          include: {
            user: { omit: { password: true, email: true, phoneNumber: true } },
          },
        },
        reviewee: {
          include: {
            reviewee: {
              omit: { password: true, email: true, phoneNumber: true },
            },
            reviewer: {
              omit: { password: true, email: true, phoneNumber: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        featuredSkills: {
          include: { skill: true },
          orderBy: { startedAt: 'desc' },
        },
        jobpost: {
          where: { status: { in: ['ACTIVE', 'CLOSED'] } },
          orderBy: {
            postedAt: 'desc',
          },
        },
      },
    });
    if (!user) {
      return CustomNextResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }
    return CustomNextResponse(true, 'REQUEST_SUCCESS', 'Хэрэглэгч олдлоо!', {
      user,
    });
  } catch (err) {
    console.error(err, 'Сервер дээр алдаа гарлаа!');
  }
}
