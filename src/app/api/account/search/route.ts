import { prisma } from "@/lib/prisma";
import { CustomNextResponse } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search");

    if (!search) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Хайлтын түлхүүр үг илгээгүй байна!",
        null
      );
    }
    const resultclient = await prisma.user.findMany({
      where: {
        AND: [
          {
            role: "CLIENT",
          },
          {
            OR: [
              { about: { contains: search, mode: "insensitive" } },
              { companyName: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      },
      include: { featuredSkills: true, skill: true, reviewee: true },
      omit: { password: true },
    });
    const resultfreelancer = await prisma.user.findMany({
      where: {
        AND: [
          {
            role: "FREELANCER",
          },
          {
            OR: [
              {
                firstName: { contains: search, mode: "insensitive" },
              },
              { lastName: { contains: search, mode: "insensitive" } },
              { about: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      },
      include: { featuredSkills: true, skill: true, reviewee: true },
      omit: { password: true },
    });
    if (resultclient.length === 0 && resultfreelancer.length === 0) {
      return CustomNextResponse(false, "NO_RESULT", "Илэрц олдсонгүй", [
        ...resultfreelancer,
        ...resultclient,
      ]);
    }

    return CustomNextResponse(
      true,
      "RESULTS_FOUND",
      "Илэрц амжилттай олдлоо!",

      [...resultfreelancer, ...resultclient]
    );
  } catch (err) {
    console.error(err);
  }
}
