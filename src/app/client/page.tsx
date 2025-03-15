"use client";
import { useEffect, useState } from "react";
import { ClientCard } from "../_component/ ClientPostCard";
import { review, skill, user } from "@prisma/client";
import axios from "axios";
import Loading from "../_component/loading";
import CustomSkeleton from "../_component/skeleton";
export type CustomUser = user & {
  skill: skill[];
  reviewee: review[];
};
export default function Freelance() {
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/account/user/all`);
        if (res.data.success) {
          const filteredUsers = res.data.data.users.filter(
            (user: CustomUser) => {
              return user.companyName;
            }
          );
          setUsers(filteredUsers);
        }
        setLoading(false);
      } catch (err) {
        console.error(err, "aldaa frontend");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
  return (
    <div>
      {!loading ? (
        <>
          <div className="border border-solid max-w-[1250px] text-center p-4 font-bold rounded-3xl mx-auto ">
            Дундаж үнэлгээ: {allreviews(users)}/5
          </div>
          <div className="max-w-[1280px] mx-auto flex  ">
            {users
              .map((user) => <ClientCard key={user.id} user={user} />)
              .slice(0, 4)}
          </div>
        </>
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
