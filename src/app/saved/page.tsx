"use client";

import { user } from "@prisma/client";
import { useEffect, useState } from "react";
import { CustomUser } from "../freelancer/page";
import axios from "axios";
import { ClientCard } from "../_component/ ClientPostCard";
type favorite = {
  id: string;
  role: string;
};
export default function Saved() {
  const [favorites, setFavorites] = useState<favorite[]>([]);
  //   const [users, setUsers] = useState<CustomUser[]>([]);
  const [clients, setClients] = useState<CustomUser[]>([]);
  const [freelancers, setFreelancers] = useState<CustomUser[]>([]);
  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    const storedFavorites = favoritesString ? JSON.parse(favoritesString) : [];
    setFavorites(storedFavorites);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`/api/saved`, favorites);
      if (res.data.success) {
        const allusers: CustomUser[] = res.data.data;
        const clients = allusers.filter((user) => user.role === "CLIENT");
        const freelancers = allusers.filter((user) => user.role !== "CLIENT");
        setClients(clients);
        setFreelancers(freelancers);
      }
    };
    fetchData();
  }, [favorites]);
  return (
    <div>
      {clients.length > 0 && (
        <div className="p-6">
          <div> Компаниуд:</div>
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-4 mb-4">
            {clients.map((user) => (
              <ClientCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
      {freelancers.length > 0 && (
        <div className="p-6">
          <div> Талентууд:</div>
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-4 mb-4">
            {freelancers.map((user) => (
              <ClientCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
