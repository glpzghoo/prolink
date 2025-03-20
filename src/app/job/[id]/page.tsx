"use client";

import Loading from "@/app/_component/loading";
import CustomSkeleton from "@/app/_component/skeleton";
import MailDetail from "@/app/account/_components/maildetailbutton";
import { Textarea } from "@/components/ui/textarea";
import { calculateTime } from "@/lib/helper";
import { responseData } from "@/lib/types";
import { Button, Rating } from "@mui/material";
import { job, jobApplication, review, skill, user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ImSpinner10 } from "react-icons/im";
export type CustomJob = job & {
  poster: CustomUser;
  postedAt: string;
  skill: skill[];
  jobApplication: jobApplication[];
};
export type CustomUser = user & {
  reviewee: CustomReviewee[];
  reviewer: review[];
};
type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
};

export default function App() {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return <div>Холбоос буруу байна!</div>;
  }
  const [post, setPost] = useState<CustomJob>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [userApplied, setUserApplied] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/job/post?id=${id}`);
      if (res.data.success) {
        setPost(res.data.data.post);
      }
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isClicked]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [response]);
  useEffect(() => {
    const fetc = async () => {
      const response = await axios.get(`/api/job/checkApplied?id=${id}`);
      if (response.data.success) {
        setUserApplied(!!response.data.data.userApplied);
      }
    };
    fetc();
  }, [isClicked]);
  const avgRating = (user: CustomUser) => {
    if (!user.reviewee || user.reviewee.length === 0) return 0;

    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    const fixed = total / user.reviewee.length / 20;
    return Number(fixed.toFixed(1));
  };
  const sendJobApplication = async () => {
    setLoading2(true);
    try {
      const res = await axios.get(`/api/sendMail/jobApplication?id=${id}`);
      setResponse(res.data);
    } catch (err) {
      console.error(err, "Сервер дээр асуудал гарлаа!");
    } finally {
      setLoading2(false);
      setIsClicked(!isClicked);
    }
  };
  // avgRating(post?.poster);
  return loading ? (
    <CustomSkeleton />
  ) : post ? (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-screen-lg mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-background  shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-ыт text-green-700">
                {post.status === "ACTIVE" ? (
                  <div className=" text-green-600 text-xs flex items-center gap-1 whitespace-nowrap">
                    <div>Идэвхитэй зар</div>{" "}
                    <GoDotFill className="animate-ping duration-4000" />
                  </div>
                ) : (
                  <div className=" text-pink-400 text-xs flex items-center gap-1 whitespace-nowrap">
                    <div>Идэвхигүй зар</div>{" "}
                  </div>
                )}
              </span>
              <div className="flex items-center space-x-2 text-2xl font-extrabold">
                {post.title}
              </div>
              <div className="flex gap-4 text-xs">
                <div className="text-gray-400">
                  нийтэлсэн байгууллага:{" "}
                  <Link target="blank" href={`/client/${post.poster.id}`}>
                    <span className="text-black font-bold">
                      {post.poster.companyName}
                    </span>
                  </Link>
                </div>
                <div className="text-gray-400">
                  {calculateTime(post.postedAt)}
                </div>
              </div>
            </div>
          </div>

          <Button sx={{ color: "green" }} className="flex gap-1">
            <div className="text-green-600 hover:text-green-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2">
              Хуваалцах
            </div>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-3"></div>
          <div className="mt-2 md:mt-0 flex items-center space-x-4 text-xs text-gray-500">
            <div>
              Пост <span className=" font-bold">{post.jobPostView}</span>{" "}
              үзэлттэй байна,
            </div>
            <div>-</div>
            <div>
              Одоогоор нийт{" "}
              <span className=" font-bold">{post.jobApplication.length}</span>{" "}
              хүн ажиллах хүсэлт тавьсан байна!
            </div>
            <div>-</div>
            <div>
              Ажил олгогчийн дундаж үнэлгээ:{" "}
              <span className=" font-bold">{avgRating(post.poster)}/5</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-4 border-b">
          <div className="border-b py-5">
            <div className="flex flex-col gap-3 justify-center">
              <h2 className="text-2xl font-extrabold text-[#129600]">
                Зарын дэлгэрэнгүй
              </h2>
              <p>{post.description}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-evenly">
            <div>
              Цалин -{" "}
              <span className="text-xl font-bold">
                {post.salary}/
                {post.salaryRate === "MONTH"
                  ? `сар`
                  : post.salaryRate === "HOUR"
                  ? `өдөр`
                  : `цаг`}
              </span>
            </div>
            <div>
              Туршлага -{" "}
              <span className="text-xl font-bold">
                {post.experienced ? `шаардлагатай` : `шаардлагагүй`}
              </span>
            </div>
            <div>
              Байршил -{" "}
              <span className="text-xl font-bold">{post.jobLocation}</span>
            </div>
          </div>
        </div>
        {post.status === "ACTIVE" ? (
          <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-around">
            <div className="mb-2 md:mb-0 font-bold">
              Уг ажлыг сонирхож байна уу?
            </div>
            {userApplied ? (
              <div className="text-gray-400 font-bold">Хүсэлт илгээсэн!</div>
            ) : (
              <Button
                disabled={loading2}
                onClick={sendJobApplication}
                sx={{ color: "green" }}
              >
                {loading2
                  ? "Ажлын хүсэлт илгээж байна!"
                  : "Ажиллах хүсэлт илгээх"}
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-around">
            {/* <div className="mb-2 md:mb-0 font-bold">
              Уг пост идэвхигүй байна!
            </div> */}
            <Link href={`/client/${post.poster.id}`}>
              <Button sx={{ color: "green" }}>
                Идэвхигүй ч гэсэн ажиллах хүсэлтэй байгаа бол энд дарж
                компанитай холбогдох хүсэлт илгээнэ үү!
              </Button>
            </Link>
          </div>
        )}
        {response?.message && (
          <Snackbar
            sx={{ color: response.success ? "green" : "red" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={response.message ? true : false}
            message={response.message}
          />
        )}
        <div className="mt-4 pb-4 border-b">
          <h3 className="font-semibold text-md mb-2">Бусад төстэй зарууд</h3>
          <div className="flex flex-wrap gap-2"></div>
        </div>
        <div className="w-full">
          <div className=" flex gap-14 whitespace-nowrap overflow-scroll"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <div>Пост олдсонгүй! </div>
      <Link href={`/job`}>
        <Button className=" underline">Буцах</Button>
      </Link>
    </div>
  );
}
