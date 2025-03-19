"use client";

import Loading from "@/app/_component/loading";
import { CustomUser } from "@/app/client/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";
import { job, jobApplication, review, skill, user } from "@prisma/client";
import axios from "axios";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { set } from "zod";

type CustomJobApplication = jobApplication & {
  job: CustomJob;
  client: CustomUser;
  createdAt: string;
  freelancer: CustomUser;
};
type CustomJob = job & {
  postedAt: string;
  skill: skill[];
};

export default function ProposalDetails() {
  const [applicationData, setApplicationData] = useState<
    CustomJobApplication[]
  >([]);
  const [user, setUser] = useState<user>();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/jobApplication`);
        if (res.data.success) {
          if (res.data.data.user.role === "CLIENT") {
            setUser(res.data.data.user);
            setRole(res.data.data.user.role);
            setApplicationData(res.data.data.user.clientJobApplication);
          } else {
            setRole(res.data.data.user.role);
            setUser(res.data.data.user);
            setApplicationData(res.data.data.user.freelancerJobApplication);
          }
        } else {
          setApplicationData(res.data);
        }
      } catch (err) {
        console.error(err, "Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  // const deleteApplication = async (id: string) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.delete(`/api/jobApplication?id=${id}`);
  //     if (res.data.success) {
  //       setRefresh(!refresh);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err, "Сервертэй холбогдож чадсангүй!");
  //   }
  // };

  // const changeApplicationStatus = await axios.post(`api/jobApplication`);

  const avgRating = (rating: review[]): number => {
    const totalRating = rating.reduce((prev, acc) => {
      prev += acc.rating;
      return prev;
    }, 0);

    const avg = totalRating / rating.length / 20;

    return Number(avg.toFixed(1));
  };

  return loading ? (
    <Loading />
  ) : applicationData.length > 0 ? (
    applicationData.map((application) => (
      <div className=" bg-gray-100 p-6" key={application.id}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{application.job.title}</h1>
              {user?.role === "FREELANCER" ? (
                <div className="flex">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert("Edit proposal clicked")}
                  >
                    Төлөв өөрчлөх
                  </Button>
                  {!application.cancelled ? (
                    <p className=" whitespace-nowrap text-xs">
                      {role === "CLIENT"
                        ? application.cancelled
                          ? "Ажил олгогч хүсэлтээ буцаасан."
                          : "Ажил олгогч таныг хүлээж байна."
                        : application.clientStatus === "waiting"
                        ? `Хүлээгдэж байна!`
                        : application.clientStatus === "accepted"
                        ? "Зөвшөөрсөн."
                        : `Татгалзсан`}
                    </p>
                  ) : (
                    <div className=" text-xs whitespace-nowrap">
                      Ажил та хүсэлтээ буцаасан байна!
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert("Edit proposal clicked")}
                  >
                    Төлөв өөрчлөх
                  </Button>
                  {!application.cancelled ? (
                    <p className=" whitespace-nowrap">
                      {role === "CLIENT"
                        ? application.cancelled
                          ? "Ажил олгогч хүсэлтээ буцаасан."
                          : "Ажил олгогч таныг хүлээж байна."
                        : application.clientStatus === "waiting"
                        ? `Хүлээгдэж байна!`
                        : application.clientStatus === "accepted"
                        ? "Зөвшөөрсөн."
                        : `Татгалзсан `}
                    </p>
                  ) : (
                    <div>Ажил горилогч хүсэлтээ буцаасан байна!</div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                {/* <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => deleteApplication(application.id)}
                >
                  Устгах
                </Button> */}
              </div>
            </div>
            {/* <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Insights</h2>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-gray-700">
                    Get daily updates on competing bids, with insights into how
                    your proposal compares.
                  </p>
                  <Button
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert("Get connects clicked")}
                  >
                    Get for 4 Connects
                  </Button>
                </div>
                <div className="w-24">
                  <img
                    src="/business.svg"
                    alt="Insights Graph"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div> */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Ажлын саналын дэлгэрэнгүй
              </h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">
                  {application.job.salary}/
                  <span className="text-gray-400">
                    {application.job.salaryRate === "MONTH"
                      ? "сар"
                      : application.job.salaryRate === "DAY"
                      ? "өдөр"
                      : "цаг"}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 text-sm text-gray-600 mb-2">
                {/* <span className="bg-gray-200 px-2 py-1 rounded">
                  {job.category}
                </span> */}
                <span>
                  Нийтлэсэн огноо: {application.job.postedAt.split("T")[0]}
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                {application.job.description}
              </p>
              <Link
                target="blank"
                href={`/job/${application.job.id}`}
                className="text-green-600 hover:underline"
              >
                Ажлын саналтай танилцах
              </Link>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Шаардагдах ур чадварууд:
              </h2>
              <div className="text-gray-700">
                <div>
                  {application.job.skill.map((skill) => (
                    <div key={skill.id}>{skill.name}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold"></h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold">
                {user?.role === "CLIENT"
                  ? "Ажил горилогчийн тухай"
                  : "Ажил олгогчийн тухай"}
              </span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                <div className="flex gap-2">
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
                </div>
              </div>
              <span className="text-gray-700">
                {role === "CLIENT"
                  ? avgRating(application.freelancer.reviewee)
                  : avgRating(application.client.reviewee)}
                /5 reviews
              </span>
            </div>
            <p className="text-gray-700 mb-2">
              Байршил:
              {role === "CLIENT"
                ? application.freelancer.companyLocation
                : application.client.companyLocation}
            </p>
            <p className="text-gray-700 mb-2">
              Огноо:
              {role === "CLIENT"
                ? application.createdAt.split("T")[0]
                : application.createdAt.split("T")[0]}
            </p>
            <p className="text-gray-700 mb-2">
              Холбоо барих :
              {role === "CLIENT"
                ? application.freelancer.email
                : application.client.email}
            </p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center">no job applications</div>
  );
}
