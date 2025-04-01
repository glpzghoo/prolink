"use client";

import Image from "next/image";
import {
  Search,
  Menu,
  CheckCircle,
  CircleX,
  Verified,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { responseData } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/freelancer", label: "Талентууд" },
  { href: "/job", label: "Ажлын санал" },
  { href: "/client", label: "Манайд бүртгэлтэй байгууллагууд" },
  { href: "/saved", label: "Хадгалсан" },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

export function Navigation() {
  const [response, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    signOut();
    const res = await axios.get(`/api/account/logout`);
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
    }, 500);
  }, []);

  return (
    <>
      <motion.nav
        className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 bg-white shadow-md fixed top-0 left-0 w-full z-50"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
          <Link href="/">
            <motion.div
              className="text-[#14A800] font-extrabold text-xl sm:text-2xl tracking-tight"
              variants={hoverVariants}
              whileHover="hover"
            >
              ProLink
            </motion.div>
          </Link>
          <div className="hidden xl:flex gap-6 text-sm font-medium">
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

        <div className="flex items-center gap-4">
          <button
            className="xl:hidden text-[#14A800] text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <motion.div
              className="flex w-56 sm:w-64 items-center gap-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-[#14A800] transition-all duration-300"
              variants={hoverVariants}
              whileHover="hover"
            >
              <Search className="text-[#14A800] text-xl" />
              <input
                onChange={(e) => debounce(e.target.value)}
                className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Компани, талент хайх..."
              />
            </motion.div>

            {loading ? (
              <span className="text-sm text-gray-600">Түр хүлээнэ үү...</span>
            ) : response?.code === "SUCCESS" ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    response.data?.informations?.role === "CLIENT"
                      ? `/client/${response.data?.informations?.id}`
                      : `/freelancer/${response.data?.informations?.id}`
                  }
                >
                  <motion.div
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    <div className="rounded-full w-8 h-8 items-center flex overflow-hidden border-2 border-[#14A800]">
                      <Image
                        src={`${response.data?.informations?.pfp}`}
                        width={32}
                        height={32}
                        alt="Профайлын зураг"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap hidden sm:inline">
                      {response.data?.informations?.companyName ||
                        `${response.data?.informations?.lastName} ${response.data?.informations?.firstName}`}
                      {response.data.informations.emailVerified ? (
                        <span title="Баталгаажсан">
                          <Verified className="inline ml-1 text-[#14A800] text-lg" />
                        </span>
                      ) : (
                        <span title="Баталгаажаагүй">
                          <CircleX className="inline ml-1 text-red-600 text-lg" />
                        </span>
                      )}
                    </span>
                  </motion.div>
                </Link>
                <motion.button
                  onClick={logout}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <span title="Гарах">
                    <LogOut className="text-[#14A800] text-xl" />
                  </span>
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

        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden px-4 py-4 z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? "border-b-2 border-[#14A800] text-[#14A800] bg-green-50"
                        : "hover:border-b-2 hover:border-[#14A800] hover:text-[#14A800]"
                    }`}
                    variants={hoverVariants}
                    whileHover="hover"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <motion.div
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-[#14A800] transition-all duration-300"
                variants={hoverVariants}
                whileHover="hover"
              >
                <Search className="text-[#14A800] text-xl" />
                <input
                  onChange={(e) => debounce(e.target.value)}
                  className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Компани, талент хайх..."
                />
              </motion.div>
              {response?.code === "SUCCESS" && (
                <div className="flex flex-col gap-4">
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
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="rounded-full overflow-hidden border-2 border-[#14A800]">
                        <Image
                          src={`${response.data?.informations?.pfp}`}
                          width={32}
                          height={32}
                          alt="Профайлын зураг"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {response.data?.informations?.companyName ||
                          `${response.data?.informations?.lastName} ${response.data?.informations?.firstName}`}
                        {response.data.informations.emailVerified ? (
                          <span title="Баталгаажсан">
                            <Verified className="inline ml-1 text-[#14A800] text-lg" />
                          </span>
                        ) : (
                          <span title="Баталгаажаагүй">
                            <CircleX className="inline ml-1 text-red-600 text-lg" />
                          </span>
                        )}
                      </span>
                    </motion.div>
                  </Link>
                  {response?.data?.informations?.role === "CLIENT" && (
                    <div>
                      <Link href="/job/new">
                        <motion.div
                          className="px-4 py-2 bg-[#14A800] text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all duration-300 text-center"
                          variants={hoverVariants}
                          whileHover="hover"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Ажлын санал оруулах
                        </motion.div>
                      </Link>
                    </div>
                  )}
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    <span title="Гарах">
                      <LogOut className="text-[#14A800] text-xl" />
                    </span>
                    Гарах
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
      <div className="h-16 sm:h-20 lg:h-24 bg-white"></div>
    </>
  );
}
