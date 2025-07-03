'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { HiOutlineCheckBadge } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';
import { CustomUser } from '../freelancer/FreelancerListClient';

type Favorite = {
  id: string;
  role: string;
};

export function ClientCard({ user, favorites }: { user: CustomUser; favorites?: Favorite[] }) {
  const avrRating = () => {
    if (!user?.reviewee || user.reviewee.length === 0) return '0.0';
    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    return (total / user.reviewee.length / 20).toFixed(1);
  };

  const formattedSalary = user.salary.toLocaleString('mn-MN');
  const userSaved = favorites?.some((fav) => fav.id === user.id);

  return (
    <Link
      href={user.companyName ? `/client/${user.id}` : `/freelancer/${user.id}`}
      className="block w-full max-w-[400px] mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[400px] relative overflow-hidden">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MdOutlineRemoveRedEye className="text-base" />
            <span>{user.profileViews}</span>
          </div>
          {!user.companyName && (
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <span className="text-base font-bold text-green-600 dark:text-green-400">
                {formattedSalary} ₮
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
                {user.salaryType === 'HOUR' ? 'цагт' : 'сард'}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-green-300 mb-3 shadow-sm">
            <Image
              src={user.pfp || '/default-profile.png'}
              alt="Profile Picture"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex items-center justify-center gap-1">
            <h3
              title={user.companyName || user.lastName + ' ' + user.firstName}
              className="text-xl font-semibold text-foreground truncate max-w-[250px]"
            >
              {user.companyName || user.firstName}
            </h3>
            {user.emailVerified && (
              <HiOutlineCheckBadge title="Баталгаажсан" className="text-green-500 text-lg" />
            )}
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.85636 3.35986L11.1929 6.96136L14.8881 7.16761C15.0704 7.17736 15.2459 7.24561 15.3921 7.36261C15.5376 7.47961 15.6456 7.64011 15.7034 7.82386C15.7611 8.00761 15.7649 8.20486 15.7146 8.39086C15.6657 8.57451 15.5637 8.73966 15.4214 8.86561L12.5444 11.3001L13.5059 15.0449C13.5509 15.2339 13.5411 15.4326 13.4774 15.6149C13.4155 15.7955 13.3015 15.9537 13.1496 16.0694C12.9996 16.1819 12.8204 16.2449 12.6366 16.2494C12.4511 16.2529 12.2692 16.1978 12.1169 16.0919L8.99986 13.9821L5.89036 16.0776C5.739 16.1841 5.55794 16.2403 5.37286 16.2381C5.18778 16.235 5.00833 16.1739 4.85986 16.0634C4.70767 15.9496 4.59258 15.7932 4.52911 15.6141C4.46376 15.432 4.45154 15.2351 4.49386 15.0464L5.44786 11.3174L2.57836 8.86636C2.43604 8.74041 2.33403 8.57526 2.28511 8.39161C2.23473 8.2054 2.23864 8.00867 2.29636 7.82461C2.3523 7.64351 2.4606 7.48301 2.60761 7.36336C2.75386 7.24636 2.92936 7.17811 3.11161 7.16836L6.80686 6.96211L8.14336 3.36061C8.21236 3.18061 8.33086 3.02611 8.48386 2.91811C8.63406 2.80974 8.81453 2.75136 8.99974 2.75122C9.18495 2.75109 9.36551 2.80921 9.51586 2.91736C9.66886 3.02611 9.78661 3.17986 9.85636 3.35986Z"
                fill="#14A800"
                stroke="#14A800"
                strokeWidth="1.5"
              />
            </svg>
            <span className="font-semibold">{avrRating()}/5.0</span>
            <span className="text-xs">({user.reviewee.length})</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.skill.length > 0 ? (
              user.skill.slice(0, 3).map((skill) => (
                <span
                  key={skill.id}
                  className="bg-muted text-foreground text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground italic">
                {user.role === 'CLIENT'
                  ? 'Нээлттэй ажлын байр оруулаагүй байна'
                  : 'Ур чадвар оруулаагүй байна'}
              </span>
            )}
            {user.skill.length > 3 && (
              <span className="w-6 h-6 text-xs font-semibold bg-muted text-foreground rounded-full flex items-center justify-center">
                +{user.skill.length - 3}
              </span>
            )}
          </div>
        </div>
        {userSaved && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-green-600 dark:text-green-400 px-2 py-1 rounded-full bg-muted">
            <IoMdCheckmark className="text-base" />
            <span className="text-xs font-medium">Хадгалсан</span>
          </div>
        )}
      </div>
    </Link>
  );
}
