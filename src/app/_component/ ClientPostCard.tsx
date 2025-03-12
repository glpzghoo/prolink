import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { CustomUser } from "../freelancer/page";

export function ClientCard({ user }: { user: CustomUser }) {
  const avrRating = () => {
    if (!user?.reviewee || user.reviewee.length === 0) return 0;
    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    const avg = total / user.reviewee.length / 20;
    return avg.toFixed(1);
  };
  return (
    <div className=" max-w-[280px] max-h-[450px] md:mt-8 mx-auto border border-[#e9e9e9] rounded-xl ">
      <p className="text-end text-[#4c4b4b] p-6 text-sm ">
        {user.salary} /{user.salaryType === "ONETIME" ? `цагийн` : `сар`}
      </p>
      <div className="flex pb-6 flex-col items-center ">
        <img src={`${user.pfp}`} className="w-24 h-24 rounded-full" />
        <p className="font-bold text-2xl"> {user.lastName}</p>
        <div className="flex items-center gap-1 text-[#676767] text-sm">
          <CiStar className="size-5 text-green-800" />
          {avrRating()}/5
          <p>(58 Ажил)</p>
        </div>
        <div className="grid grid-cols-2 gap-2 px-10 p-4 ">
          {user.skill
            .map((skills) => (
              <button
                key={skills.id}
                className="p-2 max-w-36 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]"
              >
                {skills.name}
              </button>
            ))
            .slice(0, 4)}
        </div>
        <Link href={`/freelancer/${user.id}`}>
          <button className="bg-[#108a00] p-3 text-white rounded-lg items-center">
            Дэлгэрэнгүй
          </button>
        </Link>
      </div>
    </div>
  );
}
