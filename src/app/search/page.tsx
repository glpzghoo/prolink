"use client";

import { user } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loading from "../_component/loading";
import { ClientCard } from "../_component/ ClientPostCard";
import { CustomUser } from "../freelancer/page";

export default function App() {
  const search = useSearchParams().get("search");
  const router = useRouter();
  const [user, setUser] = useState<CustomUser[]>([]);
  const [clients, setClients] = useState<CustomUser[]>([]);
  const [freelancers, setFreelancers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (search) {
        setLoading2(true);
        try {
          const res = await axios.post(`/api/account/search?search=${search}`);
          if (res.data.success) {
            setUser(res.data.data);

            const users: CustomUser[] = res.data.data;

            const freelancer = users.filter((use) => use.role === "FREELANCER");
            const client = users.filter((use) => use.role === "CLIENT");
            setClients(client);
            setFreelancers(freelancer);
          } else {
            setUser([]);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
          setLoading2(false);
        }
      } else {
        router.back();
      }
    };
    fetch();
  }, [search]);
  console.log({ user, freelancers, clients });
  return (
    <Suspense fallback={<Loading />}>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {loading2 && <Loading />}
            <div className="text-center py-4">
              Таны хайлтын дүн:{" "}
              <span className=" font-semibold">
                "{search}" ({user.length})
              </span>
            </div>
            {user.length > 0 ? (
              <div className="flex flex-col text-foreground px-28">
                {freelancers.length > 0 && (
                  <div className=" font-bold">
                    <div>Мэргэжилтэнгүүд</div>
                    <div className="flex">
                      {freelancers.map((freelancer) => (
                        <ClientCard key={freelancer.id} user={freelancer} />
                      ))}
                    </div>
                  </div>
                )}
                {clients.length > 0 && (
                  <div>
                    <div className=" font-bold">Байгууллагууд:</div>
                    <div className="flex">
                      {clients.map((client) => (
                        <ClientCard key={client.id} user={client} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className=" text-center">Тохирох үр дүн олдсонгүй!</div>
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
