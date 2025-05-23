"use client";
import { Suspense, useEffect, useState } from "react";
import { ClientCard } from "../_component/ ClientPostCard";
import { review, skill, user } from "@prisma/client";
import axios from "axios";
import Loading from "../_component/loading";
import CustomSkeleton from "../_component/skeleton";
import { useSearchParams } from "next/navigation";
import Badge from "../_component/skillBadge";
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
            (user: CustomUser) => {
              return user.role === "CLIENT";
            }
          );

          const sortedUsers = filteredUsers.sort(
            (user1: CustomUser, user2: CustomUser) => {
              return user2.profileViews - user1.profileViews;
            }
          );
          setUsers(sortedUsers);
        }
      } catch (err) {
        console.error(err, "aldaa frontend");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user: CustomUser) => {
      return user.companyName;
    });
    const sortedUsers = filteredUsers.sort(
      (user1: CustomUser, user2: CustomUser) => {
        return user2.profileViews - user1.profileViews;
      }
    );
    const filterSkills = sortedUsers.filter((user: CustomUser) => {
      return user.skill.some((sk) => sk.id === filter);
    });
    setFilteredUsers(filterSkills);
  }, [filter]);
  const allreviews = (data: CustomUser[]): number => {
    const total = data.reduce((prev, acc) => {
      const total1 = acc.reviewee.reduce((prev1, acc1) => {
        prev1 += acc1.rating;
        return prev1;
      }, 0);
      return (prev += total1);
    }, 0);

    const length = data.reduce((prev, acc) => {
      prev += acc.reviewee.length;

      return prev;
    }, 0);
    const result = total / length / 20;
    return Number(result.toFixed(1));
  };

  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    const favoritesL = fav ? JSON.parse(fav) : [];
    setFavorites(favoritesL);
  }, []);
  return (
    <div>
      {!loading ? (
        <Suspense fallback={<Loading />}>
          <Badge />
          <div className="border border-solid max-w-[1250px] text-center p-4 font-bold rounded-3xl mx-auto mb-4">
            Дундаж үнэлгээ:{" "}
            {allreviews(users) ? allreviews(users) + "/5" : "Үнэлгээ алга"}
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap max-w-[70%] gap-6">
              {(filter ? filteredUsers : users).map((user) => (
                <ClientCard favorites={favorites} key={user.id} user={user} />
              ))}
            </div>
          </div>
        </Suspense>
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
