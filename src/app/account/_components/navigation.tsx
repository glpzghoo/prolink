"use client";
import Image from "next/image";
import {
  IoIosSearch,
  IoMdCheckmark,
  IoMdCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { BsList } from "react-icons/bs";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { GoUnverified } from "react-icons/go";
import { responseData } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { Button, Input, ThemeProvider } from "@mui/material";
import { userInfo } from "os";
import { theme } from "@/lib/theme";
import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
export function Navigation() {
  const [response, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const getInfo = async () => {
    const res = await axios.get(`/api/account`);
    setUserInfo(res.data);
    await axios.get(`/api/account/refreshToken`);
  };
  useEffect(() => {
    try {
      getInfo();
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
    }
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
        <div className=" hidden xl:flex gap-6 text-sm font-medium">
          <Link href={`/freelancer`}>
            <div
              className={`${
                pathname === `/freelancer` &&
                `border-b border-[#14A800] text-[#14A800]`
              } p-2 hover:border-b hover:border-[#14A800] hover:transition-all `}
            >
              Мэргэжилтэнгүүд
            </div>
            {/* <div className=" h-full w-1 hover:w-full transition-all hover:border-b hover:border-[#14A800] p-1"></div> */}
          </Link>
          <Link href={`/job`}>
            <div
              className={`${
                pathname === `/job` &&
                `border-b border-[#14A800] text-[#14A800]`
              } p-2 hover:border-b hover:border-[#14A800] hover:transition-all `}
            >
              Ажлын санал
            </div>
          </Link>
          <Link href={`/client`}>
            <div
              className={`${
                pathname === `/client` &&
                `border-b border-[#14A800] text-[#14A800]`
              } p-2 hover:border-b hover:border-[#14A800] hover:transition-all `}
            >
              Манайд бүртгэлтэй байгууллагууд
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="xl:flex items-center hidden"></div> */}

      <div className="hidden xl:flex items-center gap-1.5">
        <div className="flex w-48 gap-2 items-center rounded-full px-2">
          <div className="bg-[#14A800] rounded-full p-1">
            <IoIosSearch className="text-2xl text-background" />
          </div>
          <ThemeProvider theme={theme}>
            <Input className="border-none shadow-none " placeholder="Хайх" />
          </ThemeProvider>
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
                    href={
                      response.data?.informations?.companyName
                        ? `/client/${response.data?.informations?.id}`
                        : `/freelancer/${response.data?.informations?.id}`
                    }
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
                    {response.data.informations.emailVerified ? (
                      <HiOutlineCheckBadge
                        title="Баталгаажсан"
                        className="text-green-700 text-2xl"
                        onMouseOver={() => "asdf"}
                      />
                    ) : (
                      <GoUnverified
                        title="Баталгаажаагүй"
                        className="text-red-700 text-2xl"
                        onMouseOver={() => "asdf"}
                      />
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className=" p-0 bg-background hover:bg-secondary cursor-pointer rounded-full overflow-hidden"
                  >
                    <RiLogoutBoxRFill className=" text-[#14A800] text-3xl " />
                  </button>{" "}
                  {response?.data?.informations?.role == "CLIENT" && (
                    <Link href={`/job/new`}>
                      <Button sx={{ color: "#14A800" }}>
                        Ажлын санал оруулах
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link href={`/account`}>
                  <Button
                    sx={{
                      color: "green",
                      border: "1px,  solid",
                      borderRadius: "15px",
                    }}
                    className=" cursor-pointer p-2 rounded-2xl px-5 text-background"
                  >
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
