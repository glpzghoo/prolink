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
      } catch (err) {
        console.error(err, "Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);
  const deleteSkill = async (id: string) => {
    try {
      setLoading2(true);
      const res = await axios.delete(`/api/skills/featured?id=${id}`);
      if (res.data.success) {
        setRefresh(!refresh);
      }
      setLoading2(false);
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : featured ? (
        <div className="w-full flex flex-col items-center">
          <div className=" w-2/4 bg-background  shadow-lg">
            <div className="flex flex-col gap-4">
              <FeaturedSkillNewButton
                setRefresh={setRefresh}
                refresh={refresh}
                setLoading={setLoading}
                featured={featured}
              />
              <div className=" font-bold flex justify-center">
                Таны онцолсон ур чадварууд
              </div>
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
                <div className="text-xs">
                  Одоогоор онцолсон ур чадварууд алга
                </div>
              )}
            </div>
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
