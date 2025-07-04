'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';

import { Bookmark, Briefcase, Building2, Menu, Users } from 'lucide-react';
import { motion } from 'framer-motion';

import { responseData } from '@/lib/types';
import SearchInput from './search-input';
import UserProfileMenu from './UserProfileMenu';
import TimeNow from './time';
import BubbleNavItem from './BubbleNavItem';
const navItems = [
  { href: '/freelancer', icon: <Users />, label: 'Талентууд', x: -90, y: 70 },
  { href: '/job', icon: <Briefcase />, label: 'Ажлын санал', x: -30, y: 90 },
  { href: '/client', icon: <Building2 />, label: 'Байгууллагууд', x: 30, y: 90 },
  { href: '/saved', icon: <Bookmark />, label: 'Хадгалсан', x: 90, y: 70 },
];

const navLinks = [
  { href: '/freelancer', label: 'Талентууд' },
  { href: '/job', label: 'Ажлын санал' },
  { href: '/client', label: 'Байгууллагууд' },
  { href: '/saved', label: 'Хадгалсан' },
];

export default function Navigation() {
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const [response, setUserInfo] = useState<responseData>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/account').then((res) => {
      setUserInfo(res.data);
      return axios.get('/api/account/refreshToken');
    });
  }, [pathname]);

  const handleLogout = async () => {
    setUserInfo(undefined);
    await signOut();
    await axios.get('/api/account/logout');
    router.refresh();
  };

  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/search?search=${query}`);
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  return (
    <>
      <motion.nav className="fixed top-0 left-0 w-full z-50 bg-background shadow-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-evenly">
        <div>
          <TimeNow />
        </div>
        <div
          className="relative w-fit mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="/">
            <div className="text-primary font-extrabold text-3xl text-center cursor-pointer">
              ProLink
            </div>
          </Link>

          {navItems.map((item, i) => (
            <BubbleNavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              x={item.x}
              y={item.y}
              delay={i * 0.05}
              hovered={hovered}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            className="2xl:hidden text-primary text-2xl"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <Menu />
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <SearchInput onSearch={handleSearch} />
            {response?.code === 'SUCCESS' && response.data?.informations ? (
              <UserProfileMenu user={response.data.informations} onLogout={handleLogout} />
            ) : (
              <Link href="/account">
                <div className="px-4 py-2 bg-primary text-background rounded-full text-sm font-medium hover:opacity-90 transition">
                  Нэвтрэх эсвэл бүртгүүлэх
                </div>
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 left-0 w-full bg-background shadow-md 2xl:hidden px-4 py-4 z-40"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                <div
                  className={`py-2 px-3 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? 'border-b-2 border-primary text-primary'
                      : 'hover:border-b-2 hover:border-primary hover:text-primary'
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}

            <SearchInput onSearch={handleSearch} />

            {response?.code === 'SUCCESS' && response.data?.informations && (
              <div className="flex flex-col gap-3 pt-2">
                <UserProfileMenu user={response.data.informations} onLogout={handleLogout} />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-24 bg-secondary" />
    </>
  );
}
