import { CiStar } from "react-icons/ci";

export default function ClientCard() {
  return (
    <div className="max-w-[308px] max-h-[435px] mx-auto border border-[#e9e9e9] rounded-xl ">
      <p className="text-end text-[#4c4b4b] p-6 text-sm ">$50/цагт</p>
      <div className="flex pb-6 flex-col items-center gap-5">
        <img src="images.jpeg" className="max-w-[128px] rounded-[45px]" />
        <p className="font-bold"> Баасандорж О.</p>
        <div className="flex items-center gap-1 text-[#676767] text-sm">
          <CiStar className="size-5" />
          5.0/5
          <p>(58 Ажил)</p>
        </div>
        <div className="w-[250px] flex gap-2 ">
          <button className="p-2 text-sm text-[#676767] rounded-3xl cursor-pointer bg-[#e9e9e9]">
            JavaSciprt
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
        <button className="bg-[#108a00] p-3 text-white rounded-lg items-center">
          Дэлгэрэнгүй
        </button>
      </div>
    </div>
  );
}
