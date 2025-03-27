"use client";

import Loading from "@/app/_component/loading";
import { CustomUser } from "@/app/client/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rating, Snackbar } from "@mui/material";
import { job, jobApplication, review, skill, user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { boolean } from "zod";
import { responseData } from "@/lib/types";
import { ImNewTab } from "react-icons/im";
import { avgRating } from "@/lib/helper";
import { CircleX, Verified } from "lucide-react";

type CustomJobApplication = jobApplication & {
  job: CustomJob;
  client: CustomUser;
  createdAt: string;
  freelancer: CustomUser;
  cancelled: boolean;
  clientStatus: string;
};

type CustomJob = job & {
  postedAt: string;
  skill: skill[];
};

export default function ProposalDetails() {
  const [applicationData, setApplicationData] = useState<
    CustomJobApplication[]
  >([]);
  const [user, setUser] = useState<user | undefined>();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [alert, setAlert] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [acceptedAlert, setAcceptedAlert] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [message, setMessage] = useState<responseData>();
  const [requestValue, setRequestValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading2(true);
        const res = await axios.get("/api/jobApplication");
        if (res.data?.success && res.data?.data?.user) {
          const { user } = res.data.data;
          setUser(user);
          setRole(user.role);
          setApplicationData(
            user.role === "CLIENT"
              ? user.clientJobApplication || []
              : user.freelancerJobApplication || []
          );
        } else {
          console.warn("Unexpected API response:", res.data);
          setApplicationData([]);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
        setLoading2(false);
      }
    };
    fetchData();
  }, [refresh]);

  const changeApplicationStatus = async () => {
    if (!statusValue || !applicationId) return;
    setLoading2(true);
    try {
      const response = await axios.put("/api/jobApplication", {
        statusValue,
        applicationId,
      });
      if (response.data.success) {
        setRefresh(!refresh);
      }
      setMessage(response.data);
      setAlert(true);
    } catch (err) {
      console.error("Status Update Error:", err);
    } finally {
      setLoading2(false);
    }
  };

  const changeRequestStatus = async () => {
    if (!requestValue || !applicationId) return setLoading2(true);
    try {
      const response = await axios.patch("/api/jobApplication", {
        requestValue,
        applicationId,
      });
      if (response.data.success) {
        setRefresh(!refresh);
      }
      setMessage(response.data);

      setAlert(true);
    } catch (err) {
      console.error("Value change error", err);
    } finally {
      setLoading2(false);
    }
  };
  useEffect(() => {
    setAcceptedAlert(true);
    const timeout = setTimeout(() => {
      setAcceptedAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [statusValue]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  const renderStatusMessage = (application: CustomJobApplication) => {
    if (application.cancelled) {
      return role === "CLIENT"
        ? "Талент хүсэлтээ буцаасан байна!"
        : "Та хүсэлтээ буцаасан байна!";
    }
    if (role === "CLIENT") {
      return application.clientStatus === "waiting"
        ? "Хүлээгдэж байна!"
        : application.clientStatus === "accepted"
        ? "Зөвшөөрсөн"
        : "Татгалзсан";
    }
    return application.clientStatus === "waiting"
      ? "Компаний хариуг хүлээж байна."
      : application.clientStatus === "accepted"
      ? "Зөвшөөрсөн"
      : "Татгалзсан";
  };

  const getStatusStyles = (application: CustomJobApplication) => {
    if (application.cancelled) {
      return "bg-red-100 text-red-800";
    }
    switch (application.clientStatus) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <Loading />;
  if (!applicationData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Одоогоор ажлын хүсэлт байхгүй байна.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {loading2 && <Loading />}
      <div className="max-w-6xl mx-auto space-y-6">
        {applicationData.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            {alert && (
              <div>
                {message?.message && (
                  <Snackbar
                    sx={{ color: message.success ? "green" : "red" }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={message.message ? true : false}
                    message={message.message}
                  />
                )}
              </div>
            )}
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {application.job.title}
                  </h1>
                  <p
                    className={cn(
                      "text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap",
                      getStatusStyles(application)
                    )}
                  >
                    {renderStatusMessage(application)}
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Ажлын дэлгэрэнгүй
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      {application.job.salary}
                      <span className="text-gray-500 text-sm ml-1">
                        /
                        {application.job.salaryRate === "MONTH"
                          ? "сар"
                          : application.job.salaryRate === "DAY"
                          ? "өдөр"
                          : "цаг"}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>
                      Нийтлэсэн: {application.job.postedAt.split("T")[0]}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-hidden">
                    {application.job.description}
                  </p>
                  <Link
                    href={`/job/${application.job.id}`}
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Ажлын саналтай танилцах
                  </Link>
                </div>
                {acceptedAlert && (
                  <Snackbar
                    sx={{ color: "red" }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={statusValue === "accepted" ? true : false}
                    message={`Зөвшөөрсөн анкетийн төлөвийг, дараа өөрчлөх боломжгүйг
                      анхаарна уу!`}
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Шаардлага
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {application.job.skill.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-80 bg-gray-50 p-6 flex flex-col items-center justify-between rounded-lg">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    {role === "CLIENT" ? "Талентын тухай" : "Компаний тухай"}
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <div className=" flex gap-2">
                      <strong>Нэр:</strong>{" "}
                      {role === "CLIENT" ? (
                        <Link
                          target="blank"
                          href={`/freelancer/${application.freelancer.id}`}
                        >
                          <div className=" flex gap-1">
                            <div>{application.freelancer.firstName}</div>
                            <div>{application.freelancer.lastName}</div>{" "}
                            <ImNewTab className="text-xs" />
                            {application.freelancer.emailVerified ? (
                              <span title="Баталгаажсан">
                                <Verified className="inline ml-1 text-[#14A800] text-lg" />
                              </span>
                            ) : (
                              <span title="Баталгаажаагүй">
                                <CircleX className="inline ml-1 text-red-600 text-lg" />
                              </span>
                            )}
                          </div>
                        </Link>
                      ) : (
                        <Link
                          target="blank"
                          href={`/client/${application.client.id}`}
                        >
                          <div className=" flex gap-1">
                            <div>{application.client.companyName}</div>{" "}
                            <ImNewTab className="text-xs" />
                            {application.client.emailVerified ? (
                              <span title="Баталгаажсан">
                                <Verified className="inline ml-1 text-[#14A800] text-lg" />
                              </span>
                            ) : (
                              <span title="Баталгаажаагүй">
                                <CircleX className="inline ml-1 text-red-600 text-lg" />
                              </span>
                            )}
                          </div>
                        </Link>
                      )}{" "}
                    </div>
                    <div className=" flex gap-2">
                      <div className=" flex gap-2">
                        {role === "CLIENT" && (
                          <>
                            <strong>Хүйс:</strong>{" "}
                            <div className=" flex gap-1">
                              <div>
                                {application.freelancer.gender === "MALE"
                                  ? "Эрэгтэй"
                                  : "Эмэгтэй"}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {role === "CLIENT" && (
                        <div className=" flex gap-2">
                          <>
                            <strong>Нас:</strong>{" "}
                            <div className="flex gap-1">
                              <div>
                                {(() => {
                                  const birthDate = new Date(
                                    application.freelancer.birthday
                                  );
                                  const today = new Date();
                                  let age =
                                    today.getFullYear() -
                                    birthDate.getFullYear();
                                  const birthdayThisYear = new Date(
                                    today.getFullYear(),
                                    birthDate.getMonth(),
                                    birthDate.getDate()
                                  );
                                  if (today < birthdayThisYear) {
                                    age--;
                                  }
                                  return age;
                                })()}
                              </div>
                            </div>
                          </>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <strong>Үнэлгээ:</strong>{" "}
                      <Rating
                        name="half-rating-read"
                        value={
                          role === "CLIENT"
                            ? avgRating(application.freelancer.reviewee)
                            : avgRating(application.client.reviewee)
                        }
                        precision={0.5}
                        readOnly
                      />
                      <span>
                        {role === "CLIENT"
                          ? avgRating(application.freelancer.reviewee)
                          : avgRating(application.client.reviewee)}{" "}
                        / 5
                      </span>
                    </div>

                    <p>
                      <strong>Огноо:</strong>{" "}
                      {application.createdAt.split("T")[0]}
                    </p>
                    <p>
                      <strong>Холбоо барих:</strong>{" "}
                      {role === "CLIENT"
                        ? application.freelancer.email +
                          ", " +
                          application.freelancer.phoneNumber
                        : application.client.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {role === "CLIENT" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Select
                          disabled={
                            application.cancelled ||
                            application.clientStatus === "accepted"
                          }
                          defaultValue={application.clientStatus}
                          onValueChange={(value) => {
                            setStatusValue(value);
                            setApplicationId(application.id);
                          }}
                        >
                          <SelectTrigger className="w-[180px] border-gray-300">
                            <SelectValue placeholder="Төлөв сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                value="accepted"
                                disabled={
                                  application.clientStatus === "accepted"
                                }
                              >
                                Зөвшөөрөх
                              </SelectItem>
                              <SelectItem
                                value="denied"
                                disabled={application.clientStatus === "denied"}
                              >
                                Татгалзах
                              </SelectItem>
                              <SelectItem
                                value="waiting"
                                disabled={
                                  application.clientStatus === "waiting"
                                }
                              >
                                Хүлээгдэж байна
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={changeApplicationStatus}
                          disabled={
                            loading2 ||
                            application.cancelled ||
                            application.clientStatus === "accepted"
                          }
                        >
                          Хадгалах
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Select
                        disabled={
                          application.clientStatus === "accepted" ||
                          application.clientStatus === "denied"
                        }
                        // value={String(application.cancelled)}
                        defaultValue={application.cancelled ? "true" : "false"}
                        onValueChange={(value) => {
                          setRequestValue(value);
                          setApplicationId(application.id);
                        }}
                      >
                        <SelectTrigger className="w-[180px] border-gray-300">
                          <SelectValue placeholder="Төлөв сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="true"
                              disabled={application.cancelled}
                            >
                              Хүсэлт буцаах
                            </SelectItem>

                            <SelectItem
                              value="false"
                              disabled={!application.cancelled}
                            >
                              Дахин илгээх
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={changeRequestStatus}
                        disabled={
                          loading2 ||
                          application.clientStatus === "accepted" ||
                          application.clientStatus === "denied"
                        }
                      >
                        Хадгалах
                      </Button>
                    </div>
                  )}
                </div>
                {application.clientStatus === "accepted" ? (
                  <div className=" absolute bottom-1 right-1 text-green-400 text-sm">
                    Зөвшөөрөгдсөн анкетийн төлөвийг өөрчлөх боломжгүй. Таньд
                    амжилт хүсье!
                  </div>
                ) : (
                  application.clientStatus === "denied" &&
                  role === "FREELANCER" && (
                    <div className=" absolute bottom-1 right-1 text-red-400 text-sm">
                      Таны анкетанд татгалзсан хариу илгээжээ {":("}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
