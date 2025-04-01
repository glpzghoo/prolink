import Link from "next/link";
import { CustomUser } from "../freelancer/page";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

type Favorite = {
  id: string;
  role: string;
};

export function ClientCard({
  user,
  favorites,
}: {
  user: CustomUser;
  favorites?: Favorite[];
}) {
  const avrRating = () => {
    if (!user?.reviewee || user.reviewee.length === 0) return "0.0";
    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    return (total / user.reviewee.length / 20).toFixed(1);
  };

  const formattedSalary = Number(user.salary).toLocaleString("mn-MN");
  const userSaved = favorites?.some((fav) => fav.id === user.id);

  return (
    <Link
      href={user.companyName ? `/client/${user.id}` : `/freelancer/${user.id}`}
      className="block w-full max-w-[360px] mx-auto"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg hover:border-green-300 transition-all duration-300 flex flex-col h-[360px] relative overflow-hidden">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MdOutlineRemoveRedEye className="text-base text-gray-500" />
            <span>{user.profileViews}</span>
          </div>
          {!user.companyName && (
            <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-md">
              <span className="font-semibold text-green-700">
                {formattedSalary} ₮
              </span>
              <span className="text-xs text-gray-700 bg-green-100 px-1.5 py-0.5 rounded">
                {user.salaryType === "HOUR" ? "цагт" : "сард"}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-green-200 mb-3">
            <Image
              src={user.pfp || "/default-profile.png"}
              alt="Profile Picture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 96px"
            />
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate max-w-[250px]">
                {user.companyName || user.firstName}
              </h3>
              {user.emailVerified && (
                <HiOutlineCheckBadge
                  title="Баталгаажсан"
                  className="text-green-600 text-lg flex-shrink-0"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-gray-700 mt-1">
              <svg
                width="16"
                height="16"
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
                />
              </svg>
              <span className="font-medium">{avrRating()}/5.0</span>
              <span className="text-xs">({user.reviewee.length})</span>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {user.skill.length > 0 ? (
                user.skill.slice(0, 3).map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center bg-green-100 text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-green-200 transition-colors whitespace-nowrap"
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500 italic bg-gray-100 px-2 py-1 rounded-full">
                  Ур чадвар оруулаагүй
                </span>
              )}
              {user.skill.length > 3 && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-gray-700 text-xs font-medium rounded-full hover:bg-green-200 transition-colors">
                  +{user.skill.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
        {userSaved && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <IoMdCheckmark className="text-base" />
            <span className="text-xs font-medium">Хадгалсан</span>
          </div>
        )}
      </div>
    </Link>
  );
}
