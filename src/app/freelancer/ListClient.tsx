"use client";
import { useEffect, useState, Suspense } from "react";
import { ClientCard } from "../_component/ ClientPostCard";
import Badge from "../_component/skillBadge";
import Loading from "../_component/loading";
import { useSearchParams } from "next/navigation";
import { review, skill, user } from "@prisma/client";

export type CustomUser = user & { skill: skill[]; reviewee: review[] };
type Favorite = { id: string; role: string };

export default function ListClient({ initialUsers }: { initialUsers: CustomUser[] }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [filteredUsers, setFilteredUsers] = useState<CustomUser[]>(initialUsers);

  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    setFavorites(fav ? JSON.parse(fav) : []);
  }, []);

  useEffect(() => {
    if (filter) {
      const f = initialUsers.filter((u) => u.skill.some((s) => s.id === filter));
      setFilteredUsers(f);
    } else {
      setFilteredUsers(initialUsers);
    }
  }, [filter, initialUsers]);

  const allreviews = (data: CustomUser[]): number => {
    const total = data.reduce((prev, acc) => {
      const total1 = acc.reviewee.reduce((p1, a1) => p1 + a1.rating, 0);
      return prev + total1;
    }, 0);
    const length = data.reduce((p, a) => p + a.reviewee.length, 0);
    const result = total / length / 20;
    return Number(result.toFixed(1));
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Badge />
        <div className="border border-solid max-w-[1250px] p-4 font-bold rounded-3xl mx-auto bg-white text-center mb-4">
          Дундаж үнэлгээ: {allreviews(initialUsers) ? allreviews(initialUsers) + "/5" : "Үнэлгээ алга"}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap max-w-[70%] gap-6">
            {filteredUsers.map((user) => (
              <ClientCard favorites={favorites} key={user.id} user={user} />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
