"use client";
import { useEffect, useState } from "react";
import { ClientCard } from "../_component/ ClientPostCard";
import { review, skill, user } from "@prisma/client";
import axios from "axios";
export type CustomUser = user & {
  skill: skill[];
  reviewee: review[];
};
export default function Freelance() {
  const [users, setUsers] = useState<CustomUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/account/user/all`);
      // console.log(res);
      setUsers(res.data.data.users);
    };
    fetchData();
  }, []);
  console.log(users);
  return (
    <div className="max-w-4xl mx-auto flex md:block sm:block ">
      {users.map((user) => (
        <ClientCard key={user.id} user={user} />
      ))}
    </div>
  );
}
