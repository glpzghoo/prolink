"use client";

import Loading from "@/app/_component/loading";
import { CustomUser } from "@/app/client/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";
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
  const [refresh, setRefresh] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [applicationId, setApplicationId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
    } catch (err) {
      console.error("Status Update Error:", err);
    } finally {
      setLoading2(false);
    }
  };

  const avgRating = (rating: review[]): number => {
    if (!rating.length) return 0;
    const totalRating = rating.reduce((prev, acc) => prev + acc.rating, 0);
    return Number((totalRating / rating.length / 20).toFixed(1));
  };

  const renderStatusMessage = (application: CustomJobApplication) => {
    if (application.cancelled) {
      return role === "CLIENT"
        ? "Ажил горилогч хүсэлтээ буцаасан байна!"
        : "Та хүсэлтээ буцаасан байна!";
    }
    if (role === "CLIENT") {
      return application.clientStatus === "waiting"
        ? "Хүлээгдэж байна!"
        : application.clientStatus === "accepted"
        ? "Зөвшөөрсөн."
        : "Татгалзсан.";
    }
    return application.clientStatus === "waiting"
      ? "Ажил олгогч таныг хүлээж байна."
      : application.clientStatus === "accepted"
      ? "Зөвшөөрсөн."
      : "Татгалзсан.";
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
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {application.job.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    {role === "CLIENT" ? (
                      <div className="flex items-center gap-2">
                        <Select
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
                              <SelectItem value="accepted">
                                Зөвшөөрөх
                              </SelectItem>
                              <SelectItem value="denied">Татгалзах</SelectItem>
                              <SelectItem value="waiting">
                                Хүлээгдэж байна
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={changeApplicationStatus}
                          disabled={loading2}
                        >
                          Хадгалах
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => alert("Edit proposal clicked")}
                      >
                        Төлөв өөрчлөх
                      </Button>
                    )}
                    <p className="text-sm text-gray-600">
                      {renderStatusMessage(application)}
                    </p>
                  </div>
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
                  <p className="text-gray-700 leading-relaxed">
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

              <div className="lg:w-80 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {role === "CLIENT"
                    ? "Ажил горилогчийн тухай"
                    : "Ажил олгогчийн тухай"}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-2">
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
                    <strong>Байршил:</strong>{" "}
                    {role === "CLIENT"
                      ? application.freelancer.companyLocation
                      : application.client.companyLocation}
                  </p>
                  <p>
                    <strong>Огноо:</strong>{" "}
                    {application.createdAt.split("T")[0]}
                  </p>
                  <p>
                    <strong>Холбоо барих:</strong>{" "}
                    {role === "CLIENT"
                      ? application.freelancer.email
                      : application.client.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
