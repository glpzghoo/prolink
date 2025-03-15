import { CustomFeaturedSkill } from "@/app/freelancer/[id]/page";
import { Button } from "@mui/material";
import { featuredSkills } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export const FeaturedSkillsetup = ({
  skill,
  deleteSkill,
  setLoading2,
  loading2,
  deletingItem,
  setdeletingItem,
}: {
  skill: CustomFeaturedSkill;
  deleteSkill: (id: string) => void;
  setLoading2: Dispatch<SetStateAction<boolean>>;
  loading2: boolean;
  deletingItem: string;
  setdeletingItem: Dispatch<SetStateAction<string>>;
}) => {
  const startedAt = skill.startedAt;
  const endedAt = skill.endedAt ? skill.endedAt : null;

  const calculateYears = (end: string, start: string): string => {
    const yeardif = new Date(end).getFullYear() - new Date(start).getFullYear();
    const montdef = new Date(end).getMonth() - new Date(start).getMonth();

    const totalMonths = yeardif * 12 + montdef;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
      if (years > 0) {
        return `${years}`;
      }
    }
    return years > 0 ? `${years}.${months}` : `${months}`;
  };
  return (
    <div className="border p-5 relative">
      <div className=" absolute bottom-0 right-0">
        <Button
          disabled={loading2}
          onClick={() => {
            setdeletingItem(skill.id);
            deleteSkill(skill.id);
          }}
          sx={{ color: "green", padding: "5px, 5px", fontSize: "18px" }}
        >
          {loading2 && deletingItem === skill.id ? (
            <>Түр хүлээнэ үү...</>
          ) : (
            <>Устгах</>
          )}
        </Button>
      </div>
      <div className="flex justify-between">
        <div className=" font-semibold text-2xl">{skill.skill.name}</div>
        <div className=" whitespace-nowrap flex ">
          Туршлага:
          {`  `}
          {skill.startedAt.split("T")[0]} -{" "}
          {skill.present ? `Одоог хүртэл` : skill.endedAt.split("T")[0]}
          {endedAt ? (
            <div>
              {`    `} ({calculateYears(endedAt, startedAt)} {`жил`})
            </div>
          ) : (
            ``
          )}
        </div>
      </div>
      <div className=" p-12">
        <div className="">{skill.detail}</div>
      </div>
    </div>
  );
};
