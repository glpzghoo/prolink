import { prisma } from "@/lib/prisma";
import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SalaryType } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { title, requirements, exp, salary, salaryRate, selectedSkills } =
    await req.json();

  const parsedSalaryRate = Object.values(SalaryType).includes(
    salaryRate as SalaryType
  )
    ? (salaryRate as SalaryType)
    : null;

  if (!parsedSalaryRate) {
    return CustomNextResponse(
      false,
      "INVALID_ENUM",
      "Invalid salary type!",
      null
    );
  }

  if (!process.env.ACCESS_TOKEN) {
    return NextResponse_NoEnv(`ACCESS_TOKEN`);
  }

  const accessToken = req.cookies.get(`accessToken`)?.value;
  if (!accessToken) {
    return NextResponse_NoCookie();
  }

  const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
    id: string;
  };
  try {
    const poster = await prisma.user.findUnique({ where: { id: verify?.id } });
    if (!poster) {
      return CustomNextResponse(
        false,
        "USER_NOT_FOUND",
        "Хэрэглэгч олдсонгүй!",
        null
      );
    }
    if (poster.role === "FREELANCER") {
      return CustomNextResponse(
        false,
        "NOT_ALLOWED",
        "Freelancer -ууд пост оруулах эрхгүй!",
        null
      );
    }

    const validSkills = await prisma.skill.findMany({
      where: { name: { in: selectedSkills } },
      select: { id: true },
    });

    if (validSkills.length !== selectedSkills.length) {
      return CustomNextResponse(
        false,
        "INVALID_SKILLS",
        "One or more skills do not exist!",
        null
      );
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        description: requirements,
        experienced: exp,
        salary,
        salaryRate: salaryRate as SalaryType,
        posterId: verify?.id,
        skill: { connect: validSkills.map((skill) => ({ id: skill.id })) },
      },
    });
    if (!newJob) {
      return CustomNextResponse(
        false,
        "ERROR",
        "Шинэ зар нэмж чадсангүй!",
        null
      );
    }
    return CustomNextResponse(true, "SUCCESS", "Шинэ зар амжилттай нэмлээ!", {
      newJob,
    });
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа");
    return NextResponse_CatchError(err);
  }
}
