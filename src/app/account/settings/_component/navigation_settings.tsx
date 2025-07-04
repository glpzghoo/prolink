'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { user } from '@prisma/client';
import { usePathname } from 'next/navigation';

export default function NavigationSettings() {
  const [user, setUser] = useState<user>();
  const pathname = usePathname();

  const getInfo = async () => {
    try {
      const res = await axios.get(`/api/account`);
      if (res.data.success) {
        setUser(res.data.data.informations);
      }
    } catch (err) {
      console.error('Сервертэй холбогдож чадсангүй!', err);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const navItems = [
    user?.role === 'CLIENT'
      ? { href: '/account/settings/jobs', label: 'Ажлын саналууд' }
      : { href: '/account/settings/skills', label: 'Профайл' },
    { href: '/account/settings/application', label: 'Анкет' },
    { href: '/account/settings/about', label: 'Тухай' },
    { href: '/account/settings', label: 'Аккаунтны тохиргоо' },
  ];

  return (
    <div className="bg-background border border-border shadow-sm py-3 px-6 flex justify-center items-center">
      <nav className="flex flex-wrap gap-4">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}>
              <span
                className={`inline-block text-sm font-medium px-4 py-2 rounded-lg transition-all
                  ${
                    isActive
                      ? 'bg-muted text-foreground font-semibold'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
