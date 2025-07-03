import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allSkills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
      include: {
        user: { omit: { password: true, email: true, phoneNumber: true } },
      },
    });
    if (!allSkills) {
      return NextResponse.json({
        success: false,
        code: 'REQUEST_FAILED',
        message: 'Хүсэлт амжилтгүй боллоо!',
        data: null,
      });
    }
    return NextResponse.json({
      success: true,
      code: 'REQUEST_SUCCESS',
      message: 'Хүсэлт амжилттай боллоо!',
      data: { skills: allSkills },
    });
  } catch (err) {
    console.error(err, '');
    return NextResponse.json({
      success: false,
      code: 'SOMETHING_WENT_WRONG',
      message: 'Сервер эсвэл логик дээр асуудал гарлаа',
      data: null,
    });
  }
}
