import {
  CustomNextResponse,
  NextResponse_CatchError,
  NextResponse_NoCookie,
  NextResponse_NoEnv,
} from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { clientStatus } from "@prisma/client";
import { avgRating } from "@/lib/helper";
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function GET(req: NextRequest) {
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv(`ACCESS_TOKEN`);
    }

    const accessToken = req.cookies.get(`accessToken`)?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
      role: string;
    };

    if (verify.role === "CLIENT") {
      const user = await prisma.user.findUnique({
        where: { id: verify.id },
        include: {
          clientJobApplication: {
            include: {
              job: { include: { skill: true } },
              freelancer: { include: { reviewee: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
        omit: { password: true },
      });

      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Ажил олгогчийн анкетүүд амжилттай татлаа!",
        { user }
      );
    } else if (verify.role === "FREELANCER") {
      const user = await prisma.user.findUnique({
        where: { id: verify.id },
        include: {
          freelancerJobApplication: {
            include: {
              job: { include: { skill: true } },
              client: { include: { reviewee: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
        omit: { password: true },
      });

      return CustomNextResponse(
        true,
        "REQUEST_SUCCESS",
        "Ажил горилогчийн анкетүүд амжилттай татлаа!",
        { user }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid role" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");

    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: err,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return CustomNextResponse(
        false,
        "NO_ID_PROVIDED",
        "Хүсэлт амжилтгүй! ID олдсонгүй!",
        null
      );
    }
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
    };

    const jobApplication = await prisma.jobApplication.delete({
      where: { id },
    });

    return CustomNextResponse(
      true,
      "REQUEST_SUCCESS",
      "Амжилттай устгалаа!",
      jobApplication
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
    return NextResponse_CatchError(err);
  }
}

export async function PUT(req: NextRequest) {
  const { statusValue, applicationId } = await req.json();
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
      role: string;
    };

    const jobApplication = await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        client: {
          include: { clientJobApplication: true, reviewee: true },
        },
        freelancer: {
          include: { freelancerJobApplication: true, reviewee: true },
        },
      },
    });
    if (verify.role === "FREELANCER") {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Ажил горилогчид төлөв өөрчлөх эрх байхгүй",
        null
      );
    } else if (verify.id !== jobApplication?.clientId) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Таньд төлөв өөрчлөх эрх байхгүй байна!",
        null
      );
    }

    if (!jobApplication) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Төлөв өөрчилж чадсангүй. Анкет олдсонгүй!",
        null
      );
    }

    if (jobApplication.cancelled) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Ажил горилогч анкетийг буцаасан. Төлөв өөрчлөх боломжгүй!",
        jobApplication
      );
    }
    if (
      jobApplication.clientStatus === "accepted" &&
      statusValue === "accepted"
    ) {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Юу ч өөрчлөгдөөгүй!",
        jobApplication
      );
    }
    if (jobApplication.clientStatus === "accepted") {
      return CustomNextResponse(
        false,
        "REQUEST_FAILED",
        "Зөвшөөрсөн анкетийн төлөв өөрчлөх боломжгүй!",
        jobApplication
      );
    }

    const updateApplication = await prisma.jobApplication.update({
      where: {
        id: jobApplication.id,
      },
      data: { clientStatus: statusValue },
    });

    if (statusValue === "accepted") {
      // ajil olgogch ruu
      await transporter.sendMail({
        from: "Team HexaCode - Prolink", // sender address
        to: jobApplication.client.email, // list of receivers
        subject: "ProLink - Freelancer -ийн дэлгэрэнгүй мэдээлэл!", // Subject line
        text: "Freelancing App / Team HexaCode", // plain text body
        html: `<b>Сайн байна уу! ${jobApplication.client.companyName}
        <br>
        <br>
        
        <h2>Freelancer -ын тухай дэлгэрэнгүй мэдээлэл!</h2>
            <br> 
             <br>
            <strong>Овог</strong>: ${jobApplication.freelancer.lastName}
            <br> 
             <br>
            <strong>Нэр</strong>: ${jobApplication.freelancer.firstName}
            <br> 
             <br>
            <strong>Нас</strong>: ${
              new Date().getFullYear() -
              new Date(jobApplication.freelancer.birthday).getFullYear()
            }
             <br>
              <br>
             <strong>Утасны дугаар: </strong> ${
               jobApplication.freelancer.phoneNumber
             }
            <br> 
             <br>
             <strong>Манайд гишүүн болоод: </strong> ${
               new Date(jobApplication.freelancer.createdAt)
                 .toISOString()
                 .split("T")[0]
             }
            <br> 
             <br>
            <strong>Нийт ажлын тоо: </strong> ${
              jobApplication.freelancer.freelancerJobApplication.length
            }
            <br> 
             <br>
            <strong>Манай сайт дээрх дундаж үнэлгээ: </strong> ${avgRating(
              jobApplication.freelancer.reviewee
            )}/5
             <br> 
             <br>
            Холбоосоор орон профайлтай танилцаарай! ${`${process.env.BASE_URL}/freelancer/${jobApplication.freelancer.id}`}</p>`, // html body
      });
      // ajil gorilogch ruu
      await transporter.sendMail({
        from: "Team HexaCode - Prolink", // sender address
        to: jobApplication.freelancer.email, // list of receivers
        subject: "ProLink - Байгууллагын дэлгэрэнгүй мэдээлэл!", // Subject line
        text: "Freelancing App / Team HexaCode", // plain text body
        html: `<h1><b>Сайн байна уу! - ${
          jobApplication.client.companyName
        } таны ажлын саналыг хүлээн авлаа! </h1>
            <br> <h2> Байгууллагын тухай дэлгэрэнгүй мэдээлэл!</h2>
            <br>
            <br>
            <strong>Компаны нэр: </strong>
             ${jobApplication.client.companyName}
            <br>
             <br>
            <strong>Компаныг төлөөлж: </strong>
             ${jobApplication.client.lastName} ${" "}
           ${jobApplication.client.firstName}
            <br> 
             <br>
             <strong>Утасны дугаар: </strong> ${
               jobApplication.client.phoneNumber
             }
            <br> 
             <br>
             <strong>Манайд гишүүн болоод: </strong> ${
               new Date(jobApplication.client.createdAt)
                 .toISOString()
                 .split("T")[0]
             }
            <br> 
             <br>
            <strong>Нийт анкетны тоо: </strong> ${
              jobApplication.client.clientJobApplication.length
            }
            <br> 
             <br>
            <strong>Манай сайт дээрх дундаж үнэлгээ: </strong> ${avgRating(
              jobApplication.client.reviewee
            )}/5
             <br> 
             <br>
            Холбоосоор орон профайлтай танилцаарай! ${`${process.env.BASE_URL}/client/${jobApplication.client.id}`}</p>`, // html body
      });
      return CustomNextResponse(
        true,
        "REQUEST_SUCCES",
        "Төлөв амжилттай өөрчлөгдлөө.",
        { jobApplication: { ...updateApplication } }
      );
    } else if (statusValue === "denied") {
      // ajil gorilogch ruu
      await transporter.sendMail({
        from: "Team HexaCode - Prolink", // sender address
        to: jobApplication.freelancer.email, // list of receivers
        subject: "ProLink - Харамсалтай мэдээ!", // Subject line
        text: "Freelancing App / Team HexaCode", // plain text body
        html: `<h1><b>Сайн байна уу! - ${jobApplication.client.companyName} таны ажлын саналыг зөвшөөрсөнгүй! </h1>
     <p>Та өөр ажил сонирхон хүсэлт илгээж болно! ${process.env.BASE_URL}/job </p> <br> Амжилт хүсье.`, // html body
      });
      return CustomNextResponse(
        true,
        "REQUEST_SUCCES",
        "Төлөв амжилттай өөрчлөгдлөө.",
        { jobApplication: { ...updateApplication } }
      );
    }

    return CustomNextResponse(
      true,
      "REQUEST_SUCCES",
      "Төлөв амжилттай өөрчлөгдлөө.",
      { jobApplication: { ...updateApplication } }
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  const { requestValue, applicationId } = await req.json();
  try {
    if (!process.env.ACCESS_TOKEN) {
      return NextResponse_NoEnv("ACCESS_TOKEN");
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse_NoCookie();
    }
    const jobapplication = await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!jobapplication) {
      return CustomNextResponse(false, "NOT_FOUND", "Анкет олдсонгүй", null);
    }
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as {
      id: string;
      role: string;
    };
    if (verify.role === "CLIENT") {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Ажил олгогчид төлөв өөрчлөх эрх байхгүй",
        null
      );
    } else if (jobapplication.freelancerId !== verify.id) {
      return CustomNextResponse(
        false,
        "NOT_PERMITTED",
        "Таньд уг төлөвийг өөрчлөх эрх байхгүй байна!",
        null
      );
    }

    const jobApplication = await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: { cancelled: requestValue === `false` ? false : true },
    });
    if (jobApplication) {
      return CustomNextResponse(
        true,
        "REQUEST_SUCCESSFUL",
        "Төлөв амжилттай өөрчлөгдлөө.",
        jobApplication
      );
    }
    return CustomNextResponse(
      false,
      "REQUEST FAILED",
      "Төлөв өөрчилж чадсангүй.",
      null
    );
  } catch (err) {
    console.error(err, "Сервер дээр асуудал гарлаа!");
    return NextResponse_CatchError(err);
  }
}
