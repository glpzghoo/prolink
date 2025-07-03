import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mui/material';
import { HiOutlineCheckBadge } from 'react-icons/hi2';
import { GoUnverified } from 'react-icons/go';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { CustomUser } from '../types';

interface HeaderProps {
  user: CustomUser;
  owner: boolean;
  isFavorite: boolean;
  loading2: boolean;
  sendMail: () => void;
  saveFavorite: () => void;
  copyURL: () => void;
  reactToPrintFn: () => void;
}

export default function ProfileHeader({
  user,
  owner,
  isFavorite,
  loading2,
  sendMail,
  saveFavorite,
  copyURL,
  reactToPrintFn,
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="flex items-center gap-4">
        <div className=" flex justify-center items-center w-16 h-16 overflow-hidden rounded-full">
          <Image
            src={`${user.pfp ? user.pfp : '/placeholder.png'}`}
            width={64}
            height={64}
            alt="Profile"
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">
              {user.firstName}, {user.lastName}
            </h1>
            {user.emailVerified ? (
              <HiOutlineCheckBadge title="Баталгаажсан" className="text-foreground text-xl" />
            ) : (
              <GoUnverified title="Баталгаажаагүй" className="text-red-600 text-xl" />
            )}
          </div>
          <p className="text-foreground text-sm">
            {user.skill.length} мэргэжилтэй · {user.gender === 'MALE' ? 'Эрэгтэй' : 'Эмэгтэй'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        {owner && !user.emailVerified && (
          <Button
            disabled={loading2}
            onClick={sendMail}
            sx={{ color: 'red', fontSize: '12px' }}
            className="text-red-500 hover:text-red-700"
          >
            {loading2 ? 'Түр хүлээнэ үү!' : 'Хаягаа баталгаажуулах'}
          </Button>
        )}
        <button
          onClick={saveFavorite}
          className="text-2xl text-foreground hover:text-foreground transition"
        >
          {isFavorite ? <MdFavorite className="text-foreground" /> : <MdFavoriteBorder />}
        </button>
        <button
          onClick={copyURL}
          className="text-sm text-foreground border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
        >
          Хуваалцах
        </button>
        <button
          onClick={() => reactToPrintFn()}
          className="text-sm text-foreground border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
        >
          Татах
        </button>
        {owner && (
          <Link href="/account/settings/about">
            <button className="text-sm text-foreground border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">
              Дашбоард
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
