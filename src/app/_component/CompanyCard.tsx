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
  const formattedSalary = Number(post.salary).toLocaleString("mn-MN");

  return (
    <Link href={`/job/${post.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg hover:border-green-300 transition-all duration-300 flex flex-col gap-3 sm:gap-4 relative h-[320px] w-full max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate hover:text-green-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              {calculateTime(post.postedAt)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium whitespace-nowrap">
            {post.status === "ACTIVE" ? (
              <div className="text-green-600 flex items-center gap-1">
                <GoDotFill className="animate-pulse text-sm" />
                <span>Идэвхитэй</span>
              </div>
            ) : (
              <div className="text-gray-500">Идэвхигүй</div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
          <div className="text-sm text-gray-900 truncate">
            Байгууллага:
            <span className="font-semibold">{post.poster.companyName}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-md">
            <span className="text-md font-bold text-green-700">
              {formattedSalary} ₮
            </span>
            <span className="text-xs text-gray-700 font-medium bg-green-100 px-1.5 py-0.5 rounded">
              {post.salaryRate === "MONTH"
                ? "сард"
                : post.salaryRate === "DAY"
                ? "өдөрт"
                : "цагт"}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-800 line-clamp-3 flex-1 overflow-hidden leading-relaxed">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.skill.length === 0 ? (
            <span className="text-xs text-gray-500 italic">
              Ур чадварын шаардлага байхгүй
            </span>
          ) : (
            post.skill.slice(0, 3).map((ski) => (
              <span
                key={ski.id}
                className="bg-green-100 text-gray-900 text-xs font-medium px-2 py-0.5 rounded-full hover:bg-green-200 transition-colors"
              >
                {ski.name}
              </span>
            ))
          )}
          {post.skill.length > 3 && (
            <span className="text-xs text-gray-600">
              +{post.skill.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-end gap-1 text-gray-600 mt-auto">
          <MdOutlineRemoveRedEye className="text-base" />
          <span className="text-xs font-medium">{post.jobPostView}</span>
        </div>
      </div>
    </Link>
  );
}
