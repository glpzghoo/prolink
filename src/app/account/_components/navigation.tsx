"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { BsList } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { responseData } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
export function Navigation() {
  const [response, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      const res = await axios.get(`/api/account`);
      setUserInfo(res.data);
      setLoading(false);
    };
    getInfo();
  }, [pathname]);
  const logout = async () => {
    setLoading(true);
    setUserInfo(undefined);
    const res = await axios.get(`/api/account/logout`);
    setUserInfo(res.data);
    setLoading(false);
  };
  return (
    <div className="flex justify-around items-center py-4">
      <div className="flex items-center gap-7">
        <Link href={`/`}>
          <div className="flex items-center text-[#14A800] font-extrabold text-xl">
            ProLink
          </div>
        </Link>
        <div className=" hidden xl:flex gap-6 text-xs font-medium">
          <Link href={`/freelancer`}>
            <div>Мэргэжилтэнгүүд</div>
          </Link>
          <Link href={`/client`}>
            <div>Ажлын зар</div>
          </Link>
          <Link href={`/account`}>
            <div>Хайх</div>
          </Link>
        </div>
      </div>
      {/* <div className="xl:flex items-center hidden"></div> */}

      <div className="hidden xl:flex items-center gap-1.5">
        <div className="flex w-48 border items-center rounded-full px-2">
          <div className="bg-[#14A800] rounded-full p-1">
            <IoIosSearch className="text-2xl" />
          </div>
          <Input className="border-none shadow-none" placeholder="Хайх" />
        </div>

        <div className="flex items-center h-8 rounded-full justify-around gap-2 p-3">
          {loading ? (
            <div>Түр хүлээнэ үү...</div>
          ) : (
            <div>
              {response?.code === "SUCCESS" ? (
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <Link
                    className="flex items-center gap-4 whitespace-nowrap"
                    href={`/freelancer/${response.data?.informations?.id}`}
                  >
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={`${response.data?.informations?.pfp}`}
                        width={30}
                        height={30}
                        alt="pfp"
                      />
                    </div>
                    {response.data?.informations?.companyName ? (
                      <div>{response.data.informations.companyName}</div>
                    ) : (
                      <div className=" whitespace-nowrap">
                        {response.data?.informations?.lastName}{" "}
                        {response.data?.informations?.firstName}
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="  p-0 bg-background hover:bg-secondary cursor-pointer"
                  >
                    <RiLogoutBoxRFill className=" text-[#14A800] text-3xl " />
                  </button>
                </div>
              ) : (
                <Link href={`/account`}>
                  <Button className=" cursor-pointer bg-[#14A800] p-2 rounded-2xl px-5 text-background">
                    Нэвтрэх эсвэл бүртгүүлэх
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
