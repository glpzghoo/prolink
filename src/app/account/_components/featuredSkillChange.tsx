import { CustomFeaturedSkill } from "@/app/freelancer/[id]/page";
import { featuredSkills } from "@prisma/client";

export const FeaturedSkillsetup = ({
  skill,
}: {
  skill: CustomFeaturedSkill;
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
    <div className="border p-5">
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
