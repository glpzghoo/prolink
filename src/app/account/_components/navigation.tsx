import { Input } from "@/components/ui/input";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { BsList } from "react-icons/bs";
export function Navigation() {
  return (
    <div className="flex justify-around items-center">
      <div className="flex items-center">
        <div className=" rounded-full overflow-hidden">
          <Image
            src={`/vercel.svg`}
            width={30}
            height={30}
            alt="logo"
            className="bg-[#DE3151]"
          />
        </div>
        <div>Logo</div>
      </div>
      <div className="flex items-center">
        <div className="flex w-48 border items-center rounded-full px-2">
          <Input className="border-none shadow-none" placeholder="Хайх" />
          <div className="bg-[#FF385C] rounded-full p-1">
            <IoIosSearch className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div>Зар оруулах</div>

        <div className="flex items-center bg-[#DE3151] h-8 rounded-full justify-around gap-2 p-3">
          <div>
            <BsList className="text-xl" />
          </div>
          <div className="rounded-full overflow-hidden bg-black">
            <Image src={`/vercel.svg`} alt="pfp" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
