"use client";

import Loading from "@/app/_component/loading";
import CustomSkeleton from "@/app/_component/skeleton";
import MailDetail from "@/app/account/_components/maildetailbutton";
import { Textarea } from "@/components/ui/textarea";
import { calculateTime } from "@/lib/helper";
import { responseData } from "@/lib/types";
import {
  Box,
  Button,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { featuredSkills, review, skill, user } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ImNewTab, ImSpinner10 } from "react-icons/im";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import z from "zod";
import _ from "lodash";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { GoUnverified } from "react-icons/go";
import { theme } from "@/lib/theme";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

type CustomUser = user & {
  skill: CustomSkill[];
  reviewee: CustomReviewee[];
  reviewer: review[];
  featuredSkills: CustomFeaturedSkill[];
  birthday: string;
};
type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
  createdAt: string;
};
type CustomSkill = skill & {
  user: CustomUser[];
};
export type CustomFeaturedSkill = featuredSkills & {
  skill: skill;
  startedAt: string;
  endedAt: string;
  user: CustomUser;
};
type favorite = { id: string; role: string };

const ratingSchema = z.object({
  message: z.string().min(5),
  rating: z.number().min(1),
});

export default function Client() {
  const div = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<CustomUser>();
  const [showFullReview, setShowFullReview] = useState<number | undefined>();
  const [similarUsers, setSimilarUsers] = useState<CustomUser[]>([]);
  const [favorites, setFavorites] = useState<favorite[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAddingReview, setLoadingAddingReview] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [verifyMailResponse, setVerifyMailResponse] = useState<responseData>();
  const [change, setChange] = useState(false);
  const [isValidRatingForm, setIsValidRatingForm] = useState(true);
  const [alert, setAlert] = useState(false);
  const [ratingResponse, setRatingResponse] = useState<responseData>();
  const [owner, setOwner] = useState(false);

  const params = useParams();
  const { id } = params as { id: string };
  const [ratingForm, setRatingForm] = useState({ rating: 0, message: "" });

  const handleLeftScroll = () =>
    div.current?.scrollBy({ left: -400, behavior: "smooth" });
  const handleRightScroll = () =>
    div.current?.scrollBy({ left: 400, behavior: "smooth" });

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
            (s) => s.id !== id && s.role === "FREELANCER"
          );
          setSimilarUsers(filter);
          document.title = `${userr.lastName} ${userr.firstName} - ProLink`;
        }
      } catch (err) {
        console.error(err, "Сервертэй холбогдож чадсангүй!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [change, id]);

  useEffect(() => {
    const timeout = setTimeout(() => setVerifyMailResponse(undefined), 3000);
    return () => clearTimeout(timeout);
  }, [verifyMailResponse]);

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 5000);
    return () => clearTimeout(timeout);
  }, [alert]);

  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`/api/account`);
      if (res.data.data?.informations?.id === id) setOwner(true);
      await axios.post(`/api/account/profileViews?id=${id}`);
    };
    getInfo();
  }, [change, id]);

  useEffect(() => {
    const result = ratingSchema.safeParse(ratingForm);
    setIsValidRatingForm(result.success);
  }, [ratingForm]);

  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    const storedFavorites = favoritesString ? JSON.parse(favoritesString) : [];
    setFavorites(storedFavorites);
    setIsFavorite(storedFavorites.some((a: { id: string }) => a.id === id));
  }, [id]);

  const avgRating = (): number => {
    if (!user?.reviewee || user.reviewee.length === 0) return 0;
    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    return Number((total / user.reviewee.length / 20).toFixed(1));
  };

  const copyURL = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setAlert(true));
  };

  const sendRating = async () => {
    setRatingResponse(undefined);
    setLoadingAddingReview(true);
    try {
      const res = await axios.post(`/api/review`, {
        ...ratingForm,
        revieweeId: id,
      });
      setRatingResponse(res.data);
      if (res.data.success) {
        setChange(!change);
        setRatingForm({ rating: 0, message: "" });
      }
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoadingAddingReview(false);
    }
  };

  const sendMail = async () => {
    setLoading2(true);
    const res = await axios.get(`/api/account/verifyEmail`);
    setVerifyMailResponse(res.data);
    setLoading2(false);
  };

  const saveFavorite = () => {
    const fav = favorites.some((a: { id: string }) => a.id === id);
    const updated = fav
      ? favorites.filter((f) => f.id !== id)
      : [...favorites, { id, role: user!.role }];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setIsFavorite(!fav);
  };

  const reactToPrintFn = useReactToPrint({ contentRef });

  return loading ? (
    <CustomSkeleton />
  ) : user ? (
    <div className="bg-white min-h-screen py-8">
      {user.companyName ? (
        <div className="flex justify-center items-center min-h-screen text-gray-700">
          Холбоос буруу байна!
        </div>
      ) : (
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 relative border border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center gap-4">
              {user.pfp ? (
                <Image
                  src={user.pfp}
                  width={64}
                  height={64}
                  alt="Profile"
                  className="rounded-full object-cover"
                />
              ) : (
                <img
                  src="/images.jpeg"
                  alt="Profile"
                  className="rounded-full w-16 h-16 object-cover"
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName}, {user.lastName}
                  </h1>
                  {user.emailVerified ? (
                    <HiOutlineCheckBadge
                      title="Баталгаажсан"
                      className="text-green-600 text-xl"
                    />
                  ) : (
                    <GoUnverified
                      title="Баталгаажаагүй"
                      className="text-red-600 text-xl"
                    />
                  )}
                  {((avgRating() > 4.5 && user.reviewee.length > 2) ||
                    (avgRating() > 4.0 && user.reviewee.length > 10)) && (
                    <span className="px-2 py-1 text-xs text-white bg-green-600 rounded-full">
                      Шилдэг үнэлгээтэй
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {user.skill.length} мэргэжилтэй ·{" "}
                  {user.gender === "MALE" ? "Эрэгтэй" : "Эмэгтэй"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {owner && !user.emailVerified && (
                <Button
                  disabled={loading2}
                  onClick={sendMail}
                  sx={{ color: "red", fontSize: "12px" }}
                  className="text-red-500 hover:text-red-700"
                >
                  {loading2 ? "Түр хүлээнэ үү!" : "Хаягаа баталгаажуулах"}
                </Button>
              )}
              <button
                onClick={saveFavorite}
                className="text-2xl text-gray-600 hover:text-green-600 transition"
              >
                {isFavorite ? (
                  <MdFavorite className="text-green-600" />
                ) : (
                  <MdFavoriteBorder />
                )}
              </button>
              <button
                onClick={copyURL}
                className="text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
              >
                Хуваалцах
              </button>
              <button
                onClick={() => reactToPrintFn()}
                className="text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
              >
                Татах
              </button>
              {owner && (
                <Link href="/account/settings/about">
                  <button className="text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">
                    Дашбоард
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-b pb-4 mb-6">
            <span>
              Энэ profile нийт{" "}
              <span className=" font-bold">{user.profileViews} </span>
              үзэлттэй байна!
            </span>
            <span>·</span>
            <span>
              <strong>{user.reviewee.length}</strong> үнэлгээ
            </span>
            <span>·</span>
            <span>
              Дундаж үнэлгээ:{" "}
              <span className=" font-bold"> {avgRating()} </span>
              /5
            </span>
          </div>

          {!owner && user.role === "FREELANCER" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-semibold text-green-800">
                  {user.firstName}-тэй хамтран ажиллахад бэлэн үү?
                </p>
                <MailDetail id={id} setChange={setChange} change={change} />
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-green-700">
                  Миний тухай
                </h2>
                <p className="text-gray-600 text-sm">
                  {user.salary}/{user.salaryType === "HOUR" ? "цаг" : "сар"}
                </p>
              </div>
              <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap">
                {user.about}
              </p>
            </div>
            {user.featuredSkills.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Онцолсон ур чадварууд
                </h3>
                {user.featuredSkills.map((ski) => (
                  <div key={ski.id} className="mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">
                        {ski.skill.name}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {ski.startedAt.split("T")[0]} -{" "}
                        {ski.present
                          ? "Одоог хүртэл"
                          : ski.endedAt.split("T")[0]}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{ski.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Үнэлгээ</h3>
              <div className="flex gap-2">
                <Button sx={{ color: "green" }} onClick={handleLeftScroll}>
                  <FaCircleArrowLeft className="text-xl" />
                </Button>
                <Button sx={{ color: "green" }} onClick={handleRightScroll}>
                  <FaCircleArrowRight className="text-xl" />
                </Button>
              </div>
            </div>
            <div
              ref={div}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            >
              {user.reviewee.length > 0 ? (
                user.reviewee.map((reviewe, index) => (
                  <motion.div
                    key={reviewe.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      setShowFullReview(
                        showFullReview === index + 1 ? undefined : index + 1
                      )
                    }
                    className="border rounded-lg p-4 min-w-[300px] bg-white shadow-sm hover:bg-green-50 cursor-pointer transition"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-green-700">
                        {reviewe.reviewer.companyName ||
                          reviewe.reviewer.firstName}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {calculateTime(reviewe.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Rating
                        value={reviewe.rating / 20}
                        precision={0.5}
                        readOnly
                      />
                      <span>{reviewe.rating / 20} / 5</span>
                    </div>
                    <p className="text-gray-700 mt-2 truncate">
                      {reviewe.message}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500">Үнэлгээ одоогоор алга байна!</p>
              )}
            </div>
            {showFullReview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Үнэлэгч:</span>
                  <Link
                    href={`/client/${
                      user.reviewee[showFullReview - 1].reviewer.id
                    }`}
                    target="_blank"
                    className="text-green-700 hover:underline flex items-center gap-1"
                  >
                    {user.reviewee[showFullReview - 1].reviewer.companyName ||
                      user.reviewee[showFullReview - 1].reviewer.firstName}
                    <ImNewTab className="text-xs" />
                  </Link>
                </div>
                <Rating
                  value={user.reviewee[showFullReview - 1].rating / 20}
                  precision={0.5}
                  readOnly
                />
                <p className="text-gray-700 mt-2">
                  {user.reviewee[showFullReview - 1].message}
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Үнэлгээ өгөх
            </h3>
            <Rating
              value={ratingForm.rating / 20}
              onChange={(e, value) =>
                value && setRatingForm({ ...ratingForm, rating: value * 20 })
              }
              precision={0.5}
            />
            <Textarea
              value={ratingForm.message}
              onChange={(e) =>
                setRatingForm({ ...ratingForm, message: e.target.value })
              }
              className="mt-4 w-full"
              placeholder="Таны сэтгэгдэл..."
            />
            <div className="mt-4 flex items-center gap-4">
              <ThemeProvider theme={theme}>
                <Button
                  onClick={sendRating}
                  disabled={!isValidRatingForm || loadingAddingReview}
                  variant="contained"
                  sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
                  className="rounded-full"
                >
                  {loadingAddingReview ? (
                    <div className="flex items-center gap-2">
                      <ImSpinner10 className="animate-spin" />
                      Илгээж байна...
                    </div>
                  ) : (
                    "Илгээх"
                  )}
                </Button>
              </ThemeProvider>
              {ratingResponse && (
                <span
                  className={
                    ratingResponse.success ? "text-green-700" : "text-red-700"
                  }
                >
                  {ratingResponse.message}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ур чадвар
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skill.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Төстэй талентууд
            </h3>
            {similarUsers.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {similarUsers.map((skil) => (
                  <Link
                    key={skil.id}
                    href={`/freelancer/${skil.id}`}
                    className="text-green-700 hover:underline"
                  >
                    {skil.firstName} {skil.lastName}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Одоогоор байхгүй байна!</p>
            )}
          </div>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={alert}
            message="Линк амжилттай хууллаа!"
            autoHideDuration={5000}
          />
          {verifyMailResponse?.message && (
            <Snackbar
              sx={{ color: verifyMailResponse.success ? "green" : "red" }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={!!verifyMailResponse.message}
              message={verifyMailResponse.message}
              autoHideDuration={3000}
            />
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <p className="text-lg">Хэрэглэгч олдсонгүй!</p>
      <Link href="/">
        <Button variant="text" className="mt-4 text-green-600 underline">
          Буцах
        </Button>
      </Link>
    </div>
  );
}
