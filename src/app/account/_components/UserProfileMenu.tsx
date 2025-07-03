'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Verified, CircleX, LogOut } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import AddJobDialog from '@/app/job/_components/AddJobDialog';

type Props = {
  user: {
    id: string;
    role: 'CLIENT' | 'FREELANCER';
    companyName?: string;
    firstName?: string;
    lastName?: string;
    pfp: string;
    emailVerified: boolean;
  };
  onLogout: () => void;
};

export default function UserProfileMenu({ user, onLogout }: Props) {
  const profileHref = user.role === 'CLIENT' ? `/client/${user.id}` : `/freelancer/${user.id}`;

  return (
    <div className="flex items-center gap-3">
      {/* Profile Link */}
      <Link href={profileHref}>
        <motion.div
          className="flex items-center gap-2 bg-muted p-2 rounded-full shadow-sm hover:bg-accent transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="rounded-full w-8 h-8 overflow-hidden border-2 border-primary">
            <Image src={user.pfp || '/default-profile.png'} width={32} height={32} alt="Профайл" />
          </div>
          <span className="text-sm font-medium text-foreground whitespace-nowrap hidden sm:inline">
            {user.companyName || `${user.lastName} ${user.firstName}`}
            {user.emailVerified ? (
              <span title="Баталгаажсан">
                <Verified className="inline ml-1 text-primary text-lg" />
              </span>
            ) : (
              <span title="Баталгаажаагүй">
                <CircleX className="inline ml-1 text-destructive text-lg" />
              </span>
            )}
          </span>
        </motion.div>
      </Link>

      {/* Dashboard */}
      <Link href="/account/settings/about">
        <motion.div
          className="p-2.5 bg-muted rounded-full hover:bg-accent transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          title="Дашбоард"
        >
          <MdDashboard className="text-primary text-xl" />
        </motion.div>
      </Link>

      {/* Logout */}
      <motion.button
        onClick={onLogout}
        className="p-2.5 bg-muted rounded-full hover:bg-accent transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        title="Гарах"
      >
        <LogOut className="text-primary text-xl" />
      </motion.button>

      {/* Post Job (for clients only) */}
      {user.role === 'CLIENT' && <AddJobDialog />}
    </div>
  );
}
