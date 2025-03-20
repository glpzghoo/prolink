"use client";
import Loading from "@/app/_component/loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { calculateTime } from "@/lib/helper";
import { responseData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Snackbar } from "@mui/material";
import { job, skill, user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";

type CustomUser = user & {
  jobpost: CustomJob[];
};
type CustomJob = job & {
  postedAt: string;
  updatedAt: string;
};
export default function AboutSettings() {
  const [user, setUser] = useState<CustomUser>();
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const res = await axios.get(`/api/account`);
    if (res.data.success) {
      setUser(res.data.data.informations);
    }
  };
  useEffect(() => {
    try {
      getInfo();
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(user);
  return !loading && user ? (
    <div className="bg-secondary flex justify-center">
      {user?.role === "CLIENT" ? (
        <div className=" bg-background w-1/2 shadow-lg p-4">
          Таны оруулсан ажлын саналууд:
          {user.jobpost.length > 0 ? (
            <div className="flex justify-center flex-col p-2 py-2 gap-1">
              {user.jobpost.map((post, i) => (
                <div
                  className={`${
                    user.jobpost.length > i + 1 && `border-b border-gray-200`
                  } py-5 relative flex flex-col gap-1`}
                  key={post.id}
                >
                  <div className=" flex justify-between">
                    <Link target="blank" href={`/job/${post.id}`}>
                      <div className="font-bold">{post.title}</div>
                    </Link>
                    <div className="flex justify-end font-semibold text-green-700  absolute top-0 right-0">
                      <div>Таны амласан цалин: {post.salary}</div>/
                      <div>
                        {post.salaryRate === "MONTH"
                          ? `сар`
                          : post.salaryRate === "DAY"
                          ? "өдөр"
                          : `цаг`}
                      </div>
                    </div>
                  </div>

                  <div> {post.description}</div>
                  <div>Байршил: {post.jobLocation}</div>
                  <div className="flex justify-between">
                    <div className="text-gray-400/70 text-xs absolute bottom-2 left-0">
                      Зар үүссэн огноо: {post.postedAt.split("T")[0]} (
                      {calculateTime(post.postedAt)})
                    </div>
                    <div className="flex  absolute bottom-2 right-0">
                      <div>харсан: </div>
                      <div>{post.jobPostView}</div>
                    </div>
                  </div>   
                  <div>{post.experienced}</div>
                  <div>
                    {post.status === "ACTIVE" ? (
                      <div className=" text-[#14A800] text-xs absolute top-0 left-0 flex items-center gap-1">
                        <GoDotFill className="animate-ping duration-4000" />
                        <p>идэвхитэй пост</p>
                      </div>
                    ) : post.status === "CLOSED" ? (
                      <div className=" text-pink-400/70 text-xs absolute top-0 left-0 flex items-center gap-1">
                        <p>идэвхигүй пост</p>
                      </div>
                    ) : (
                      <div className=" text-gray-400/70 text-xs absolute top-0 left-0 flex items-center gap-1">
                        <p>Ноорог пост</p>
                      </div>
                    )}
                  </div>
                  <Link href={`/job/new`}>
                      <Button sx={{ color: "#14A800" }}>
                        Устгах
                      </Button>
                    </Link>
                </div>
              ))}
            </div>
          ) : (
            <div>Таньд оруулсан ажлын санал алга!</div>
          )}
        </div>
      ) : (
        <div className="text-center min-h-screen content-center">
          Холбоос буруу байна!
        </div>
      )}
    </div>
  ) : (
    <div className="">
      <Loading />
    </div>
  );
}
