import Link from "next/link";
import { CustomUser } from "../freelancer/page";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ClientCard({ user }: { user: CustomUser }) {
  const avrRating = () => {
    if (!user?.reviewee || user.reviewee.length === 0) return 0;
    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    const avg = total / user.reviewee.length / 20;
    return avg.toFixed(1);
  };
  return (
    <Link
      className="w-[280px] max-h-[450px] md:mt-8 mx-auto border border-[#e9e9e9] rounded-xl p-4 shadow-lg"
      href={user.companyName ? `/client/${user.id}` : `/freelancer/${user.id}`}
    >
      <div>
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <MdOutlineRemoveRedEye />
            {user.profileViews}
          </div>
          <p className="">
            {!user.companyName &&
              `${user.salary} /${
                user.salaryType === "HOUR" ? "цагийн " : "сарийн"
              }`}
          </p>
        </div>
        <div className="flex pb-6 flex-col items-center justify-center ">
          <div className="w-24 h-24 rounded-full overflow-hidden flex justify-center items-center">
            <Image
              src={`${user.pfp}`}
              className=""
              alt="pfp"
              width={100}
              height={100}
            />
          </div>
          <p className="font-bold text-2xl">
            {" "}
            {user.companyName ? user.companyName : user.lastName}
          </p>
          <div className="flex items-center gap-1 text-[#676767] text-sm">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.85636 3.35986L11.1929 6.96136L14.8881 7.16761C15.0704 7.17736 15.2459 7.24561 15.3921 7.36261C15.5376 7.47961 15.6456 7.64011 15.7034 7.82386C15.7611 8.00761 15.7649 8.20486 15.7146 8.39086C15.6657 8.57451 15.5637 8.73966 15.4214 8.86561L12.5444 11.3001L13.5059 15.0449C13.5509 15.2339 13.5411 15.4326 13.4774 15.6149C13.4155 15.7955 13.3015 15.9537 13.1496 16.0694C12.9996 16.1819 12.8204 16.2449 12.6366 16.2494C12.4511 16.2529 12.2692 16.1978 12.1169 16.0919L8.99986 13.9821L5.89036 16.0776C5.739 16.1841 5.55794 16.2403 5.37286 16.2381C5.18778 16.235 5.00833 16.1739 4.85986 16.0634C4.70767 15.9496 4.59258 15.7932 4.52911 15.6141C4.46376 15.432 4.45154 15.2351 4.49386 15.0464L5.44786 11.3174L2.57836 8.86636C2.43604 8.74041 2.33403 8.57526 2.28511 8.39161C2.23473 8.2054 2.23864 8.00867 2.29636 7.82461C2.3523 7.64351 2.4606 7.48301 2.60761 7.36336C2.75386 7.24636 2.92936 7.17811 3.11161 7.16836L6.80686 6.96211L8.14336 3.36061C8.21236 3.18061 8.33086 3.02611 8.48386 2.91811C8.63406 2.80974 8.81453 2.75136 8.99974 2.75122C9.18495 2.75109 9.36551 2.80921 9.51586 2.91736C9.66886 3.02611 9.78661 3.17986 9.85636 3.35986Z"
                fill="#14A800"
                stroke="#14A800"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {avrRating()}/5
            <p>({user.reviewee.length} үнэлгээ өгсөн)</p>
          </div>
          <div className=" flex flex-wrap justify-center gap-2">
            {user.skill
              .map((skills) => (
                <Button
                  key={skills.id}
                  className=" truncate text-xs bg-secondary hover:bg-secondary text-foreground rounded-full h-5"
                >
                  {skills.name}
                </Button>
              ))
              .slice(0, 3)}
          </div>
        </div>
      </div>
    </Link>
  );
}
