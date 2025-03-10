import Link from "next/link";
import { CiStar } from "react-icons/ci";

export function ClientCard() {
  return (
    <div className="min-w-[308px] max-h-[500px] mx-auto border border-[#e9e9e9] rounded-xl ">
      <p className="text-end text-[#4c4b4b] p-6 text-sm ">$50/цагт</p>
      <div className="flex pb-6 flex-col items-center gap-5">
        <img src="images.jpeg" className="max-w-[128px] rounded-full" />
        <p className="font-bold"> Баасандорж О.</p>
        <div className="flex items-center gap-1 text-[#676767] text-sm">
          <CiStar className="size-5 text-green-800" />
          5.0/5
          <p>(58 Ажил)</p>
        </div>
        <div className="min-w-[250px] grid grid-cols-3 gap-3 ">
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            JavaSciprt
          </button>
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            JavaSciprt
          </button>
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            JavaSciprt
          </button>
          <button className="p-2 text-sm text-[#676767]  rounded-3xl cursor-pointer bg-[#e9e9e9]">
            HTML
          </button>
          <button className="p-2 text-sm text-[#676767]  rounded-3xl cursor-pointer bg-[#e9e9e9]">
            HTML
          </button>
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            CSS
          </button>
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            Python
          </button>
        </div>
        <Link href={"http://localhost:3000/client"}>
          <button className="bg-[#108a00] p-3 text-white rounded-lg items-center">
            Дэлгэрэнгүй
          </button>
        </Link>
      </div>
    </div>
  );
}
