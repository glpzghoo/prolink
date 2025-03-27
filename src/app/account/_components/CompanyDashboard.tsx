"use client";
import Loading from "@/app/_component/loading";
import CustomSkeleton from "@/app/_component/skeleton";
import MailDetail from "@/app/account/_components/maildetailbutton";
import { CustomJob } from "@/app/job/[id]/page";
import { Textarea } from "@/components/ui/textarea";
import { calculateTime } from "@/lib/helper";
import { theme } from "@/lib/theme";
import { responseData } from "@/lib/types";
import {
  Box,
  Button,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { featuredSkills, job, review, skill, user } from "@prisma/client";
import axios from "axios";
import { motion } from "framer-motion";
import _ from "lodash";
import { EyeIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { GoDotFill, GoUnverified } from "react-icons/go";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { ImNewTab, ImSpinner10 } from "react-icons/im";
import z from "zod";
type CustomUser = user & {
  skill: CustomSkill[];
  reviewee: CustomReviewee[];
  reviewer: review[];
  featuredSkills: CustomFeaturedSkill[];
  jobpost: CustomJob[];
};
type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
  createdAt: string;
};
type CustomSkill = skill & {
  user: CustomUser[];
  reviewer: CustomUser;
};
export type CustomFeaturedSkill = featuredSkills & {
  skill: skill;
  startedAt: string;
  endedAt: string;
  user: CustomUser;
};
const ratingSchema = z.object({
  message: z.string().min(5),
  rating: z.number().min(1),
});
export default function Client() {
  const [user, setUser] = useState<CustomUser>();
  const [similarUsers, setSimilarUsers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loadingAddingReview, setloadingAddingReview] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [change, setChange] = useState(false);
  const [isValidRatingForm, setisValidRatingForm] = useState(true);
  const [ratingResponse, setratingResponse] = useState<responseData>();
  const [verifyMailResponse, setVerifyMailResponse] = useState<responseData>();
  const [showFullReview, setshowFullReview] = useState<number | undefined>();
  const [alert, setAlert] = useState(false);
  const div = useRef<HTMLDivElement>(null);
  const textDiv = useRef<HTMLDivElement>(null);
  const handleLeftScroll = () => {
    if (div.current) {
      div.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };
  const handleRightScroll = () => {
    if (div.current) {
      div.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  const params = useParams();
  const { id } = params as { id: string };
  if (!id) {
    return <div>NOPE</div>;
  }
  const [ratingForm, setRatingForm] = useState({ rating: 0 });
  const [owner, setOwner] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/freelancers/id?id=${id}`);
        if (res1.data.success) {
          setUser(res1.data.data.user);
          const userr: CustomUser = res1.data.data.user;
          const similar = _.uniqBy(userr.skill, "id");
          const flat = similar.flatMap((a) => a.user);
          const uniqs = _.uniqBy(flat, "id");
          const filter = uniqs.filter(
            (s) => s.id !== id && s.role === "CLIENT"
          );
          setSimilarUsers(filter);
          document.title = userr.companyName + " - ProLink";
        }
        setLoading(false);
      } catch (err) {
        console.error(err, "Сервертэй холбогдож чадсангүй!");
        setLoading(false);
      }
    };
    fetchData();
  }, [change]);
  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`/api/account`);

      if (res.data.data?.informations?.id === id) {
        setOwner(true);
      }
      await axios.post(`/api/account/profileViews?id=${id}`);
    };
    getInfo();
  }, [change]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVerifyMailResponse(undefined);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [verifyMailResponse]);
  useEffect(() => {
    const result = ratingSchema.safeParse(ratingForm);
    if (result.success) {
      setisValidRatingForm(true);
    } else {
      setisValidRatingForm(false);
    }
  }, [ratingForm]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  const avgRating = (): number => {
    if (!user?.reviewee || user.reviewee.length === 0) return 0;

    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    const fixed = total / user.reviewee.length / 20;
    return Number(fixed.toFixed(1));
  };
  const copyURL = () => {
    setAlert(false);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log("url copied!"))
      .catch((err) => console.error("fail: ", err));
    setAlert(true);
  };
  const sendRating = async () => {
    try {
      setloadingAddingReview(true);
      const res = await axios.post(`/api/review`, {
        ...ratingForm,
        revieweeId: id,
      });
      setratingResponse(res.data);
      if (res.data.success) {
        setChange(!change);
      }
      setloadingAddingReview(false);
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    }
  };
  const sendmail = async () => {
    setLoading2(true);
    const res = await axios.get(`/api/account/verifyEmail`);
    setVerifyMailResponse(res.data);

    setLoading2(false);
  };
  useEffect(() => {
    if (textDiv.current) {
      setExpand(textDiv.current.scrollHeight > textDiv.current.clientHeight);
    }
  }, [user]);
  return (
    <>
      {/* Үндсэн Background */}
      {loading ? (
        <CustomSkeleton />
      ) : user ? (
        <div className="bg-gray-100 min-h-screen ">
          {/* Цагаан блок (main container) */}
          {loading2 && <Loading />}
          <div className="max-w-screen-lg mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-background  shadow-lg ">
            {/* Дээд хэсэг */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {/* Профайл зураг */}
                {user.pfp ? (
                  <Image src={`${user.pfp}`} width={56} height={56} alt="pfp" />
                ) : (
                  <img
                    src="images.jpeg"
                    alt="Profile"
                    className="rounded-full w-14 h-14 object-cover"
                  />
                )}
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={alert}
                  message={"Линк амжилттай хууллаа!"}
                />
                {verifyMailResponse?.message && (
                  <Snackbar
                    sx={{ color: verifyMailResponse.success ? "green" : "red" }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={Boolean(verifyMailResponse.message)}
                    message={verifyMailResponse.message}
                  />
                )}
                <div>
                  {/* Нэр, Байршил */}
                  <div className="flex space-x-2">
                    {user.companyName ? (
                      <h1 className="text-xl font-semibold">
                        {user.companyName}
                      </h1>
                    ) : (
                      <h1 className="text-xl font-semibold">
                        {user.firstName}, {user.lastName}
                      </h1>
                    )}{" "}
                    {user.emailVerified ? (
                      <HiOutlineCheckBadge
                        title="Баталгаажсан"
                        className="text-green-700 text-lg cursor-pointer"
                        onMouseOver={() => "asdf"}
                      />
                    ) : (
                      <GoUnverified
                        title="Баталгаажаагүй"
                        className="text-red-700 text-lg cursor-pointer"
                        onMouseOver={() => "asdf"}
                      />
                    )}
                    {/* Badge жишээ */}
                    {((avgRating() > 4.5 && user.reviewee.length > 2) ||
                      (avgRating() > 4.0 && user.reviewee.length > 10)) && (
                      <span className="px-2 py-1 text-xs text-white bg-green-600 rounded-full">
                        Шилдэг үнэлгээтэй
                      </span>
                    )}
                  </div>
                  {/* <p className="text-gray-600 text-sm">
                    {user.skill.length} мэргэжилтэй
                  </p> */}
                </div>
              </div>
              {owner && !user.emailVerified && (
                <Button
                  disabled={loading2}
                  onClick={sendmail}
                  sx={{ fontSize: "11px", color: "red" }}
                  className=" text-red-400 text-xs"
                >
                  {loading2
                    ? `Түр хүлээнэ үү!`
                    : `Таны хаяг баталгаажаагүй байна. Энд дарж хаягаа баталгаажуулна
                  уу!`}
                </Button>
              )}
              {/* Хуваалцах товч */}
              <div className="flex gap-1">
                {owner && (
                  <Link
                    href={`/account/settings/${
                      user.role === "CLIENT" ? `jobs` : `skills`
                    }`}
                  >
                    <button className="text-gray-600 hover:text-gray-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2">
                      Дашбоард
                    </button>
                  </Link>
                )}

                <button
                  onClick={copyURL}
                  className="text-gray-600 hover:text-gray-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2"
                >
                  Хуваалцах
                </button>
              </div>
            </div>
            {/* /Дээд хэсэг */}

            {/* Профайл харах, статистик */}
            <div className="flex  sm:flex-row items-start sm:items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                {/* Шаардлагатай бол нэмэлт значок, тэмдэглэгээ оруулж болно */}
              </div>

              {/* ✅ Том дэлгэц дээр харагдах статистик */}
              <div className="hidden lg:flex items-center gap-4 text-sm text-gray-500">
                <div>
                  Энэ profile нийт{" "}
                  <span className="font-bold">{user.profileViews}</span>{" "}
                  үзэлттэй байна!
                </div>
                <div>-</div>
                <div>
                  <span className="font-bold">{user.reviewee.length}</span> удаа
                  үнэлгээ авсан байна.
                </div>
                <div>-</div>
                <div>
                  Дундаж үнэлгээ:{" "}
                  <span className="font-bold">{avgRating()}</span> /5
                </div>
              </div>

              {/* ✅ Mobile болон Medium дэлгэц дээр харагдах статистик */}
              <div className="flex lg:hidden items-center gap-6 text-sm text-gray-500 mt-2">
                <div className="flex items-center gap-2">
                  <EyeIcon />
                  <span className="font-bold">{user.profileViews}</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.85636 3.35986L11.1929 6.96136L14.8881 7.16761C15.0704 7.17736 15.2459 7.24561 15.3921 7.36261C15.5376 7.47961 15.6456 7.64011 15.7034 7.82386C15.7611 8.00761 15.7649 8.20486 15.7146 8.39086C15.6657 8.57451 15.5637 8.73966 15.4214 8.86561L12.5444 11.3001L13.5059 15.0449C13.5509 15.2339 13.5411 15.4326 13.4774 15.6149C13.4155 15.7955 13.3015 15.9537 13.1496 16.0694C12.9996 16.1819 12.8204 16.2449 12.6366 16.2494C12.4511 16.2529 12.2692 16.1978 12.1169 16.0919L8.99986 13.9821L5.89036 16.0776C5.739 16.1841 5.55794 16.2403 5.37286 16.2381C5.18778 16.235 5.00833 16.1739 4.85986 16.0634C4.70767 15.9496 4.59258 15.7932 4.52911 15.6141C4.46376 15.432 4.45154 15.2351 4.49386 15.0464L5.44786 11.3174L2.57836 8.86636C2.43604 8.74041 2.33403 8.57526 2.28511 8.39161C2.23473 8.2054 2.23864 8.00867 2.29636 7.82461C2.3523 7.64351 2.4606 7.48301 2.60761 7.36336C2.75386 7.24636 2.92936 7.17811 3.11161 7.16836L6.80686 6.96211L8.14336 3.36061C8.21236 3.18061 8.33086 3.02611 8.48386 2.91811C8.63406 2.80974 8.81453 2.75136 8.99974 2.75122C9.18495 2.75109 9.36551 2.80921 9.51586 2.91736C9.66886 3.02611 9.78661 3.17986 9.85636 3.35986Z"
                      fill="#14A800"
                      stroke="#14A800"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-bold">{user.reviewee.length}</span>{" "}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{avgRating()}</span> /5
                </div>
              </div>
            </div>

            {/* /Профайл харах, статистик */}

            {/* Ажилд авах уриалга (Ready to Work) */}
            {!owner && user.role === "FREELANCER" && (
              <div className="border-b pb-7">
                <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <p className="font-semibold text-green-800">
                      {user.firstName} -тэй хамтран ажиллахад бэлэн үү?
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MailDetail id={id} setChange={setChange} change={change} />
                  </div>
                </div>
              </div>
            )}
            {/* /Ажилд авах уриалга */}

            {/* Профайл ерөнхий мэдээлэл */}
            <div className="mt-6 pb-4 border-b">
              <div className=" py-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#129600]">
                    Манай байгууллагын тухай
                  </h2>
                  {/* <p className="text-gray-600 text-sm">
                    {user.salary}/{user.salaryType === "HOUR" ? `цаг` : `сар`}
                  </p> */}
                </div>
                <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                  {user.about}
                </p>
              </div>
            </div>
            {/* /Профайл ерөнхий мэдээлэл

              {/* Үнэлгээ (жишээ) */}
            <div className="mt-4 border-b pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-md">Үнэлгээ</h3>
                <div className="flex gap-4">
                  <Button sx={{ color: "green" }} onClick={handleLeftScroll}>
                    <FaCircleArrowLeft className=" text-xl" />
                  </Button>
                  <Button sx={{ color: "green" }} onClick={handleRightScroll}>
                    <FaCircleArrowRight className=" text-xl" />
                  </Button>
                </div>
              </div>
              <div
                ref={div}
                className="mt-2 flex gap-3 whitespace-nowrap overflow-hidden scrollbar-hide"
              >
                {/* Үнэлгээний зурвасын жишээ (placeholder) */}
                {user.reviewee.length > 0 ? (
                  user.reviewee.map((reviewe, index) => (
                    <div
                      onClick={() => {
                        if (!showFullReview) {
                          setshowFullReview(index + 1);
                        } else if (showFullReview === index + 1) {
                          setshowFullReview(undefined);
                        } else if (showFullReview) {
                          setshowFullReview(index + 1);
                        }
                      }}
                      key={reviewe.id}
                      className="border flex flex-col gap-10 p-6 relative max-w-96 hover:bg-green-100  cursor-pointer"
                    >
                      <div className="flex flex-col justify-center">
                        <div className="flex justify-between">
                          <h1 className=" font-semibold text-xl text-[#129600]">
                            {reviewe.reviewer.companyName
                              ? reviewe.reviewer.companyName
                              : reviewe.reviewer.firstName}
                          </h1>
                          <div className="text-xs text-gray-400 absolute top-0 right-0 p-2">
                            {calculateTime(reviewe.createdAt)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Rating
                            name="half-rating-read"
                            value={reviewe.rating / 20}
                            precision={0.5}
                            readOnly
                          />
                          <div>{reviewe.rating / 20} / 5</div>
                        </div>
                      </div>
                      <div className=" truncate">{reviewe.message}</div>
                    </div>
                  ))
                ) : (
                  // <Image
                  //   width={40}
                  //   height={40}
                  //   src="https://res.cloudinary.com/de1g2bwml/image/upload/v1741700987/31747695_s4k6_pdjv_220810_gfnpo2.jpg"
                  //   alt="Үнэлгээний зурвас"
                  // />
                  <div>Үнэлгээ одоогоор алга байна!</div>
                )}
              </div>
            </div>
            {/* show full review */}
            {showFullReview && (
              <div>
                {showFullReview > 0 && (
                  <motion.div
                    key={showFullReview}
                    initial={{ opacity: 0, height: "auto" }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="py-4 "
                  >
                    <div className=" font-semibold flex gap-3">
                      <div>Үнэлгээ үзүүлсэн хэрэглэгч: </div>
                      <Link
                        target="blank"
                        className=""
                        href={`/client/${
                          user.reviewee[showFullReview - 1].reviewer.id
                        }`}
                      >
                        <div className=" font-bold flex gap-1 items-center">
                          {user.reviewee[showFullReview - 1].reviewer
                            .companyName
                            ? user.reviewee[showFullReview - 1].reviewer
                                .companyName
                            : user.reviewee[showFullReview - 1].reviewer
                                .firstName}
                          <ImNewTab className="text-xs" />
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Rating
                        name="half-rating-read"
                        value={user.reviewee[showFullReview - 1].rating / 20}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div>{user.reviewee[showFullReview - 1].message}</div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Ажлын түүх */}
            {/* <div className="mt-4 pb-4 border-b">
              <h3 className="font-semibold text-md mb-1">Ажлын түүх</h3>
              <p className="text-gray-700 text-sm">
                Дууссан ажлууд (9) | Явагдаж буй ажлууд (1)
              </p>
            </div> */}
            <div>
              <div>Үнэлгээ өгөх</div>
              <div>
                <Rating
                  name="simple-controlled"
                  value={ratingForm?.rating ? ratingForm?.rating / 20 : 0}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setRatingForm((prev) => {
                        return {
                          ...prev,
                          rating: newValue * 20,
                        };
                      });
                    }
                  }}
                />
              </div>
              <div>
                <Textarea
                  onChange={(e) => {
                    setRatingForm((prev) => {
                      return {
                        ...prev,
                        message: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={sendRating}
                    disabled={!isValidRatingForm || loadingAddingReview}
                    className={` ${
                      loadingAddingReview ? ` text-accent` : `text-[#129600]`
                    }`}
                    type="submit"
                  >
                    {loadingAddingReview ? (
                      <div className="flex items-center gap-2">
                        <div>
                          <ImSpinner10 className=" animate-spin" />
                        </div>
                        <div>Үнэлгээг оруулж байна!</div>
                      </div>
                    ) : (
                      `Илгээх`
                    )}
                  </Button>
                </ThemeProvider>
                {ratingResponse && (
                  <div>
                    {ratingResponse?.success ? (
                      <div>{ratingResponse.message}</div>
                    ) : (
                      <div>{ratingResponse.message}</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Ур чадвар */}
            {/* <div className="mt-4 pb-4 border-b">
              <h3 className="font-semibold text-md mb-2">
                Нээлттэй ажлын байр
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skill &&
                  user.skill.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div> */}

            <div className="mt-4 ">
              {user.jobpost.length === 0 ? (
                <div> Ажлын зар байхгүй байна.</div>
              ) : (
                <>
                  <div className="text-lg font-semibold mb-3 text-[#129600]">
                    Ажлын зарууд
                  </div>
                  {user.jobpost.map((ski) => (
                    <div
                      key={ski.id}
                      className="border border-gray-200 p-4 mb-4 rounded-3xl shadow-md"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-md items-center flex gap-2">
                          <div className=" text-green-500">
                            <GoDotFill className="animate-ping duration-4000" />
                          </div>
                          <Link target="blank" href={`/job/${ski.id}`}>
                            {ski.title}
                          </Link>
                        </h3>
                        <div>{ski.postedAt.split("T")[0]}</div>
                      </div>
                      <div
                        ref={textDiv}
                        className={`list-disc list-inside text-gray-700 mt-1 ${
                          expand2 ? `h-full` : `max-h-20`
                        } transition-all duration-300 overflow-hidden`}
                      >
                        {ski.description}
                      </div>
                      {expand && (
                        <Button
                          sx={{ color: "green" }}
                          onClick={() => setExpand2(!expand2)}
                        >
                          үргэлжлүүлж унших
                        </Button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="w-full flex flex-col p-4 gap-5">
              <div className=" font-semibold">Төстэй компаниуд~</div>
              <div className=" flex gap-14 whitespace-nowrap flex-wrap">
                {similarUsers.length > 0 ? (
                  similarUsers.map((skil) => (
                    <li className="" key={skil.id}>
                      <Link href={`/client/${skil.id}`}>
                        {skil.companyName}
                      </Link>
                    </li>
                  ))
                ) : (
                  <div>Одоогоор байхгүй байна!</div>
                )}
              </div>
            </div>
            {/* /Доод линкүүдийн хэсэг */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">Холбоос буруу байна!</div>
      )}
    </>
  );
}
