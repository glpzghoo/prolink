'use client';
import { Button } from '@mui/material';
import { user } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavigationSettings() {
  const [user, setUser] = useState<user>();

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

  return (
    <div className="bg-white flex justify-center items-center py-2 px-8 shadow-md border border-gray-200">
      <nav className="flex gap-6">
        {user &&
          (user.role === 'CLIENT' ? (
            <Link href={`/account/settings/jobs`} passHref>
              <Button
                variant="text"
                sx={{
                  color: '#16a34a',
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  padding: '8px 18px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    color: '#15803d',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Ажлын саналууд
              </Button>
            </Link>
          ) : (
            <Link href={`/account/settings/skills`} passHref>
              <Button
                variant="text"
                sx={{
                  color: '#16a34a',
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  padding: '8px 18px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    color: '#15803d',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Профайл
              </Button>
            </Link>
          ))}
        {[
          { href: '/account/settings/application', label: 'Анкет' },
          { href: '/account/settings/about', label: 'Тухай' },
          { href: '/account/settings', label: 'Аккаунтны тохиргоо' },
        ].map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant="text"
              sx={{
                color: '#16a34a',
                textTransform: 'capitalize',
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  color: '#15803d',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
