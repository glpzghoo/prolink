import { job } from "@prisma/client";
import Link from "next/link";
import { calculateTime, CustomJob } from "../job/[id]/page";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
type Props = {
  post: CustomJob;
};
export default function CompanyCard({ post }: Props) {
  return (
    <Link href={`/job/${post.id}`}>
      <div className="border border-solid max-w-xl rounded-3xl flex flex-col justify-center p-6 gap-6 relative">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">{post.title}</p>
            <p className="text-gray-400 text-sm">
              {calculateTime(post.postedAt)}
            </p>
          </div>
          <div>
            {post.status === "ACTIVE" ? (
              <div className=" text-green-600 text-xs flex items-center gap-1 whitespace-nowrap">
                <div>Идэвхитэй зар</div>{" "}
                <GoDotFill className="animate-ping duration-4000" />
              </div>
            ) : (
              <div className=" text-red-600 text-xs flex items-center gap-1 whitespace-nowrap">
                <div>Идэвхитэй зар</div>{" "}
                <GoDotFill className="animate-ping duration-4000" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex text-sm items-end">
            Байгууллага:
            <span className="font-bold"> {post.poster.companyName}</span>
          </div>
          <div className="flex items-center">
            <p className=" text-2xl">{post.salary}</p>
            <h2 className="text-sm text-gray-400">
              /
              {post.salaryRate === "MONTH"
                ? `сар`
                : post.salaryRate === "DAY"
                ? `өдөр`
                : `цаг`}
            </h2>
          </div>
        </div>
        <p className=" h-[100px] overflow-hidden">{post.description}</p>

        <div className="flex gap-4">
          {post.skill.length === 0
            ? `Ур чадварын шаардлага алга`
            : post.skill.map((ski) => (
                <button
                  key={ski.id}
                  className="bg-gray-300 p-2 rounded-3xl text-sm text-gray-500"
                >
                  {ski.name}
                </button>
              ))}
        </div>
        <div className=" absolute bottom-0 right-0 p-5 flex items-center gap-1">
          {" "}
          <MdOutlineRemoveRedEye />
          {post.jobPostView}
        </div>
      </div>
    </Link>
  );
}
