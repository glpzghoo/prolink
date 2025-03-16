"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { skill } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ImSpinner11, ImSpinner9 } from "react-icons/im";
import { CustomUser } from "../freelancer/page";
type CustomSkill = skill & {
  user: CustomUser[];
};
export default function Badge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const divRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<CustomSkill[]>([]);
  const [response, setResponse] = useState<CustomSkill[]>([]);
  console.log(pathname);
  const fetchSkills = async () => {
    let res;
    try {
      res = await axios.get(`/api/skills`);
      if (res.data.success) {
        setSkills(res.data.data.skills);
      }
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
      if (res) {
        setResponse(res.data);
      }
    }
  };
  console.log({ response });
  //   const data = await fetchSkills();
  useEffect(() => {
    fetchSkills();
  }, []);
  const handleLeftScroll = () => {
    if (divRef.current) {
      divRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };
  const handleRightScroll = () => {
    if (divRef.current) {
      divRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };
  //   console.log(data);

  const filtered = () => {
    const find = skills.find((sk) => sk.id === filter);
    return find?.name ? find?.name : "";
  };
  //   console.log(filtered());
  return (
    <div className=" pb-10">
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <ImSpinner9 className="animate-spin" />
        </div>
      ) : skills.length > 0 ? (
        <>
          <div className="flex items-center gap-2 justify-center ">
            <Button
              onClick={handleLeftScroll}
              className="bg-background text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <ArrowLeftIcon />
            </Button>

            <div
              ref={divRef}
              className="flex w-3/4 overflow-hidden gap-3.5 text-background "
            >
              {skills.map((skill) => (
                <Link
                  className="shadow-lg"
                  key={skill.id}
                  href={`${pathname + `?filter=${skill.id}`}`}
                >
                  <Button className="bg-green-700 hover:bg-green-900 text-xs rounded-full whitespace-nowrap px-3 cursor-pointer">
                    {skill.name} ({skill.user.length})
                  </Button>
                </Link>
              ))}
            </div>
            <Button
              onClick={handleRightScroll}
              className="bg-background text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <ArrowRightIcon />
            </Button>
          </div>
          {filter && (
            <div className=" flex  justify-center items-center pt-2 gap-10">
              <div>Шүүлтүүр: {filtered()}</div>
              <Link href={pathname} className=" cursor-pointer">
                <Button className=" cursor-pointer">Арилгах</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-3">Skill татаж чадсангүй</div>
      )}
    </div>
  );
}
