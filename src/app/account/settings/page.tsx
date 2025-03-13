"use client";
import { Button } from "@/components/ui/button";
import { FeaturedSkillsetup } from "../_components/featuredSkillChange";
import { FeaturedSkillNewButton } from "../_components/featuredSkillNewButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { featuredSkills } from "@prisma/client";
import Loading from "@/app/_component/loading";
import { CustomFeaturedSkill } from "@/app/freelancer/[id]/page";

export default function Settings() {
  const [featured, setFeatured] = useState<CustomFeaturedSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/skills/featured`);

        setFeatured(res.data.data.user.featuredSkills);
        setLoading(false);
      } catch (err) {
        console.error(err, "Алдаа гарлаа");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);
  return (
    <div className="w-full flex justify-center">
      <div className=" w-3/4">
        <div className="flex flex-col gap-4">
          <FeaturedSkillNewButton setRefresh={setRefresh} refresh={refresh} />
          <div className=" font-bold">Таны онцолсон ур чадварууд</div>
          {loading ? (
            <Loading />
          ) : featured.length !== 0 ? (
            featured.map((ski) => (
              <FeaturedSkillsetup key={ski.id} skill={ski} />
            ))
          ) : (
            <div className="text-xs">Одоогоор онцолсон ур чадварууд алга</div>
          )}
        </div>
      </div>
    </div>
  );
}
