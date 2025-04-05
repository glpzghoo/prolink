"use client";

import Loading from "@/app/_component/loading";
import CustomSkeleton from "@/app/_component/skeleton";
import MailDetail from "@/app/account/_components/maildetailbutton";
import { Textarea } from "@/components/ui/textarea";
import { calculateTime } from "@/lib/helper";
import { responseData } from "@/lib/types";
import { Button, Chip, Rating } from "@mui/material";
import { job, jobApplication, review, skill, user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ImSpinner10 } from "react-icons/im";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/lib/theme";
import _ from "lodash";

export type CustomJob = job & {
  poster: CustomUser;
  postedAt: string;
  updatedAt: string;
  skill: CustomSkill[];
  jobApplication: jobApplication[];
};
export type CustomUser = user & {
  reviewee: CustomReviewee[];
  reviewer: review[];
};
type CustomSkill = skill & {
  job: job[];
};
type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
};

export default function App() {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return <div className="text-center text-red-600">Холбоос буруу байна!</div>;
  }

  const [post, setPost] = useState<CustomJob>();
  const [similarPosts, setSimilarPosts] = useState<job[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userApplied, setUserApplied] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [response, setResponse] = useState<responseData>();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/job/post?id=${id}`);
      if (res.data.success) {
        setPost(res.data.data.post);
        const posts: CustomJob = res.data.data.post;
        const test = posts.skill.flatMap((ski) => ski.job);
        const test2 = _.uniqBy(test, "id");
        const test3 = test2.filter((jobbb) => jobbb.id !== id);
        setSimilarPosts(test3);
        document.title = posts.title;
        if (!res.data.data.post.poster.emailVerified) setAlert(true);
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
      setAlert(false);
      setAlert2(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [alert, alert2]);

  useEffect(() => {
    const timeout = setTimeout(() => setResponse(undefined), 4000);
    return () => clearTimeout(timeout);
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
    return Number((total / user.reviewee.length / 20).toFixed(1));
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

  const copyURL = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log("url copied!"))
      .catch((err) => console.error("fail: ", err));
    setAlert2(true);
  };

  return loading ? (
    <CustomSkeleton />
  ) : post ? (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  post.status === "ACTIVE" ? "text-green-600" : "text-pink-400"
                } flex items-center gap-1`}
              >
                {post.status === "ACTIVE" ? (
                  <>
                    Идэвхитэй зар <GoDotFill className="animate-ping" />
                  </>
                ) : (
                  "Идэвхигүй зар"
                )}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
              <span>
                Нийтэлсэн:{" "}
                <Link
                  href={`/client/${post.poster.id}`}
                  className="hover:underline"
                >
                  <span
                    className={`font-semibold ${
                      post.poster.emailVerified
                        ? "text-gray-900"
                        : "text-red-600"
                    }`}
                    title={
                      post.poster.emailVerified
                        ? "Баталгаажсан хэрэглэгч"
                        : "Баталгаажуулаагүй хэрэглэгч"
                    }
                  >
                    {post.poster.companyName}
                  </span>
                </Link>
              </span>
              <span>· {calculateTime(post.postedAt)}</span>
            </div>
          </div>
          <Button
            onClick={copyURL}
            sx={{ color: "green" }}
            className="flex gap-1"
          >
            <div className="text-green-600 hover:text-green-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2">
              Хуваалцах
            </div>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-b pb-4 mb-6">
          <div>
            Пост <span className=" font-bold">{post.jobPostView}</span> үзэлттэй
            байна,
          </div>
          <span>·</span>
          <div>
            Одоогоор нийт{" "}
            <span className=" font-bold">{post.jobApplication.length}</span> хүн
            ажиллах хүсэлт тавьсан байна!
          </div>
          <span>·</span>
          <div>
            Дундаж:{" "}
            <span className=" font-bold">{avgRating(post.poster)}/5</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Саналын дэлгэрэнгүй
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap border-b pb-4 mb-6">
              {post.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800 border-b pb-4 mb-6">
            <div>
              <span className="font-medium">Цалин:</span>{" "}
              <span className="font-bold">
                {post.salary}/
                {post.salaryRate === "MONTH"
                  ? "сар"
                  : post.salaryRate === "HOUR"
                  ? "өдөр"
                  : "цаг"}
              </span>
            </div>
            <div>
              <span className="font-medium">Туршлага:</span>{" "}
              <span className="font-bold">
                {post.experienced ? "Шаардлагатай" : "Шаардлагагүй"}
              </span>
            </div>
            <div>
              <span className="font-medium">Байршил:</span>{" "}
              <span className="font-bold">{post.jobLocation}</span>
            </div>
          </div>

          <div className="border-b pb-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Шаардлага:</h3>
            <div className="flex flex-wrap gap-2">
              {post.skill.map((ski) => (
                <ThemeProvider theme={theme} key={ski.id}>
                  <Chip
                    label={ski.name}
                    variant="outlined"
                    color="primary"
                    className="rounded-full"
                  />
                </ThemeProvider>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          {post.status === "ACTIVE" ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-semibold text-gray-800">
                Уг ажлыг сонирхож байна уу?
              </span>
              {userApplied ? (
                <span className="text-gray-500 font-medium">
                  Хүсэлт илгээсэн!
                </span>
              ) : (
                <Button
                  disabled={loading2}
                  onClick={sendJobApplication}
                  variant="contained"
                  sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
                  className="rounded-full"
                >
                  {loading2 ? "Илгээж байна..." : "Хүсэлт илгээх"}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Link href={`/client/${post.poster.id}`}>
                <Button
                  variant="outlined"
                  sx={{ borderColor: "green", color: "green" }}
                  className="rounded-full"
                >
                  Компанитай холбогдох
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Бусад төстэй зарууд
          </h3>
          {similarPosts.length === 0 ? (
            <p className="text-gray-500">Төстэй пост алга</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {similarPosts.map((j) => (
                <Link
                  key={j.id}
                  href={`/job/${j.id}`}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition"
                >
                  {j.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert2}
          message="Линк амжилттай хууллаа!"
          autoHideDuration={5000}
        />
        <Snackbar
          sx={{ color: "red" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert}
          message="Сануулга: Уг байгууллага хаягаа баталгаажаагүй байна!"
          autoHideDuration={5000}
        />
        {response?.message && (
          <Snackbar
            sx={{ color: response.success ? "green" : "red" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={!!response.message}
            message={response.message}
            autoHideDuration={4000}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <p className="text-lg">Пост олдсонгүй!</p>
      <Link href="/job">
        <Button variant="text" className="mt-4 text-green-600 underline">
          Буцах
        </Button>
      </Link>
    </div>
  );
}
