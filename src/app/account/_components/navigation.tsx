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
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GoUnverified } from "react-icons/go";
import { responseData } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const navLinks = [
  { href: "/freelancer", label: "Мэргэжилтэнгүүд" },
  { href: "/job", label: "Ажлын санал" },
  { href: "/client", label: "Манайд бүртгэлтэй байгууллагууд" },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export function Navigation() {
  const [response, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearch] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const router = useRouter();
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
    signOut();
    setUserInfo(res.data);
    if (res.data.success) {
      router.refresh();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      router.push(`/search?search=${searchQuery}`);
    }
  }, [searchQuery]);

  const debounce = useCallback((searchTerm: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearch(searchTerm);
    }, 1000);
  }, []);

  return (
    <motion.nav
      className="flex justify-between items-center py-4 px-6 bg-white shadow-md"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-10">
        <Link href="/">
          <motion.div
            className="text-[#14A800] font-extrabold text-2xl tracking-tight"
            variants={hoverVariants}
            whileHover="hover"
          >
            ProLink
          </motion.div>
        </Link>
        <div className="hidden xl:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                className={`py-2 px-3 rounded-md transition-all duration-300 ${
                  pathname === link.href
                    ? "border-b-2 border-[#14A800] text-[#14A800] bg-green-50"
                    : "hover:border-b-2 hover:border-[#14A800] hover:text-[#14A800]"
                }`}
                variants={hoverVariants}
                whileHover="hover"
              >
                {link.label}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-4">
        <motion.div
          className="flex w-64 items-center gap-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-[#14A800] transition-all duration-300"
          variants={hoverVariants}
          whileHover="hover"
        >
          <IoIosSearch className="text-[#14A800] text-xl" />
          <input
            onChange={(e) => debounce(e.target.value)}
            className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            placeholder="Ажил, мэргэжилтэн хайх..."
          />
        </motion.div>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-sm text-gray-600">Түр хүлээнэ үү...</span>
          ) : response?.code === "SUCCESS" ? (
            <div className="flex items-center gap-4">
              <Link
                href={
                  response.data?.informations?.companyName
                    ? `/client/${response.data?.informations?.id}`
                    : `/freelancer/${response.data?.informations?.id}`
                }
              >
                <motion.div
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <div className="rounded-full overflow-hidden border-2 border-[#14A800]">
                    <Image
                      src={`${response.data?.informations?.pfp}`}
                      width={32}
                      height={32}
                      alt="Профайлын зураг"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    {response.data?.informations?.companyName ||
                      `${response.data?.informations?.lastName} ${response.data?.informations?.firstName}`}
                    {response.data.informations.emailVerified ? (
                      <HiOutlineCheckBadge
                        title="Баталгаажсан"
                        className="inline ml-1 text-[#14A800] text-lg"
                      />
                    ) : (
                      <GoUnverified
                        title="Баталгаажаагүй"
                        className="inline ml-1 text-red-600 text-lg"
                      />
                    )}
                  </span>
                </motion.div>
              </Link>
              <motion.button
                onClick={logout}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300"
                variants={hoverVariants}
                whileHover="hover"
                title="Гарах"
              >
                <LogOut className="text-[#14A800] text-xl" />
              </motion.button>
              {response?.data?.informations?.role === "CLIENT" && (
                <Link href="/job/new">
                  <motion.div
                    className="px-4 py-2 bg-[#14A800] text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all duration-300"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    Ажлын санал оруулах
                  </motion.div>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/account">
              <motion.div
                className="px-4 py-2 bg-[#14A800] text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all duration-300"
                variants={hoverVariants}
                whileHover="hover"
              >
                Нэвтрэх эсвэл бүртгүүлэх
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
