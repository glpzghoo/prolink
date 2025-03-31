import { job } from "@prisma/client";
import Link from "next/link";
import { CustomJob } from "../job/[id]/page";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { calculateTime } from "@/lib/helper";

type Props = {
  post: CustomJob;
};

export default function CompanyCard({ post }: Props) {
  return (
    <Link href={`/job/${post.id}`}>
      <div className="border border-solid w-xl rounded-2xl flex flex-col justify-center p-4 gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="max-w-[60%]">
            <p className="font-bold text-base truncate">{post.title}</p>
            <p className="text-gray-400 text-xs">
              {calculateTime(post.postedAt)}
            </p>
          </div>
          <div className="text-xs flex items-center gap-1 whitespace-nowrap">
            {post.status === "ACTIVE" ? (
              <div className="text-green-600 flex items-center">
                <span>Идэвхитэй зар</span>
                <GoDotFill className="animate-ping" />
              </div>
            ) : (
              <div className="text-pink-700/70">Идэвхигүй зар</div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex text-sm items-center truncate">
            Байгууллага:
            <span className="font-bold ml-1">{post.poster.companyName}</span>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-xl font-semibold">{post.salary}</p>
            <h2 className="text-xs text-gray-400">
              /
              {post.salaryRate === "MONTH"
                ? `сар`
                : post.salaryRate === "DAY"
                ? `өдөр`
                : `цаг`}
            </h2>
          </div>
        </div>

        <p className="text-sm h-[80px] overflow-hidden text-ellipsis line-clamp-3">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.skill.length === 0 ? (
            <span className="text-xs text-gray-500">
              Ур чадварын шаардлага алга
            </span>
          ) : (
            post.skill.slice(0, 3).map((ski) => (
              <button
                key={ski.id}
                className="bg-gray-200 p-1 px-2 rounded-full text-xs text-gray-600 hover:bg-gray-300 transition-colors"
              >
                {ski.name}
              </button>
            ))
          )}
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-gray-500">
          <MdOutlineRemoveRedEye className="text-sm" />
          <span className="text-xs">{post.jobPostView}</span>
        </div>
      </div>
    </Link>
  );
}
