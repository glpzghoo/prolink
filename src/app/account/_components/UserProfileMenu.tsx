'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Verified, CircleX, LogOut, FilePlus2, User } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  const displayName = user.companyName || `${user.lastName} ${user.firstName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center gap-2 bg-muted p-2 rounded-full shadow-sm hover:bg-accent transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="rounded-full w-8 h-8 overflow-hidden border-2 border-primary">
            <Image src={user.pfp || '/default-profile.png'} width={32} height={32} alt="Профайл" />
          </div>
          <span className="text-sm font-medium text-foreground whitespace-nowrap hidden sm:inline">
            {displayName}
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
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href={profileHref} className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Профайл
          </Link>
        </DropdownMenuItem>

        {/* Dashboard */}
        <DropdownMenuItem asChild>
          <Link href="/account/settings/about" className="flex items-center gap-2">
            <MdDashboard className="text-muted-foreground text-[18px]" />
            Дашбоард
          </Link>
        </DropdownMenuItem>

        {/* Post Job */}
        {user.role === 'CLIENT' && (
          <DropdownMenuItem asChild>
            <div className="w-full flex items-center gap-2">
              <FilePlus2 className="w-4 h-4 text-muted-foreground" />
              <AddJobDialog />
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem onClick={onLogout} className="text-red-500 flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
