"use client";
import { Suspense, useEffect, useState } from "react";

import { review, skill, user } from "@prisma/client";
import axios from "axios";
import Loading from "../_component/loading";
import CustomSkeleton from "../_component/skeleton";
import { useSearchParams } from "next/navigation";
import Badge from "../_component/skillBadge";
import { ClientCard } from "../_component/ ClientPostCard";

export type CustomUser = user & {
  skill: skill[];
  reviewee: review[];
  birthday: string;
};

type favorite = {
  id: string;
  role: string;
};

export default function Freelance() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<CustomUser[]>([]);
  const [favorites, setFavorites] = useState<favorite[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/account/user/all`);
        if (res.data.success) {
          const filteredUsers = res.data.data.users.filter(
            (user: CustomUser) => user.role === "CLIENT"
          );
          const sortedUsers = filteredUsers.sort(
            (user1: CustomUser, user2: CustomUser) =>
              user2.profileViews - user1.profileViews
          );
          setUsers(sortedUsers);
        }
      } catch (err) {
        console.error(err, "Алдаа: Фронтенд");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user: CustomUser) => user.companyName);
    const sortedUsers = filteredUsers.sort(
      (user1: CustomUser, user2: CustomUser) =>
        user2.profileViews - user1.profileViews
    );
    const filterSkills = sortedUsers.filter((user: CustomUser) =>
      user.skill.some((sk) => sk.id === filter)
    );
    setFilteredUsers(filterSkills);
  }, [filter]);

  const allReviews = (data: CustomUser[]): number => {
    const total = data.reduce((prev, acc) => {
      const total1 = acc.reviewee.reduce(
        (prev1, acc1) => prev1 + acc1.rating,
        0
      );
      return prev + total1;
    }, 0);
    const length = data.reduce((prev, acc) => prev + acc.reviewee.length, 0);
    const result = total / length / 20;
    return Number(result.toFixed(1));
  };

  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    const favoritesL = fav ? JSON.parse(fav) : [];
    setFavorites(favoritesL);
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {!loading ? (
        <Suspense fallback={<Loading />}>
          <div className="max-w-7xl mx-auto pb-16">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800">Фрилансерууд</h1>
              <p className="text-gray-600 mt-2">
                Манай платформ дээрх шилдэг фрилансеруудыг судлаарай
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <Badge />
            </div>
            <div className="bg-white border border-green-200 rounded-2xl p-4 sm:p-6 shadow-md max-w-4xl mx-auto mb-8">
              <p className="text-gray-900 font-semibold text-sm sm:text-base">
                Дундаж үнэлгээ:{" "}
                <span className="text-green-700">
                  {allReviews(users)
                    ? `${allReviews(users)}/5`
                    : "Үнэлгээ алга"}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filter ? filteredUsers : users).map((user) => (
                <ClientCard favorites={favorites} key={user.id} user={user} />
              ))}
            </div>
            {(filter ? filteredUsers : users).length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-md mt-6">
                <p className="text-gray-600 text-lg">
                  Одоогоор тохирох фрилансер алга
                </p>
                <p className="text-gray-500 mt-2">
                  Шүүлтүүрийг өөрчилж эсвэл хожим дахин оролдоно уу!
                </p>
              </div>
            )}
          </div>
        </Suspense>
      ) : (
        <div className="max-w-7xl mx-auto py-12">
          <CustomSkeleton />
        </div>
      )}
    </div>
  );
}
