"use client";
import { Button } from "@/components/ui/button";
import { FeaturedSkillsetup } from "../../_components/featuredSkillChange";
import { FeaturedSkillNewButton } from "../../_components/featuredSkillNewButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { featuredSkills } from "@prisma/client";
import Loading from "@/app/_component/loading";
import { CustomFeaturedSkill } from "@/app/freelancer/[id]/page";
import { responseData } from "@/lib/types";

export default function Settings() {
  const [featured, setFeatured] = useState<CustomFeaturedSkill[]>();
  const [response, setResponse] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [deletingItem, setdeletingItem] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/skills/featured`);
        if (res.data.success) {
          setFeatured(res.data.data.user.featuredSkills);
        } else {
          setResponse(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err, "Алдаа гарлаа");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);
  const deleteSkill = async (id: string) => {
    setLoading2(true);
    try {
      const res = await axios.delete(`/api/skills/featured?id=${id}`);
      if (res.data.success) {
        setRefresh(!refresh);
      }
      setLoading2(false);
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
      setLoading2(false);
    }
  };
  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <Loading />
      ) : featured ? (
        <div className=" w-2/4">
          <div className="flex flex-col gap-4">
            <FeaturedSkillNewButton
              setRefresh={setRefresh}
              refresh={refresh}
              featured={featured}
            />
            <div className=" font-bold">Таны онцолсон ур чадварууд</div>
            {featured.length !== 0 ? (
              featured.map((ski) => (
                <FeaturedSkillsetup
                  key={ski.id}
                  skill={ski}
                  deleteSkill={deleteSkill}
                  setLoading2={setLoading2}
                  loading2={loading2}
                  setdeletingItem={setdeletingItem}
                  deletingItem={deletingItem}
                />
              ))
            ) : (
              <div className="text-xs">Одоогоор онцолсон ур чадварууд алга</div>
            )}
          </div>
        </div>
      ) : (
        <div className={`min-h-screen flex items-center gap-2 justify-center`}>
          {response?.message}
        </div>
      )}
    </div>
  );
}
