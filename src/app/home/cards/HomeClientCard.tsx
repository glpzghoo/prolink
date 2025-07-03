import Image from 'next/image';
import Link from 'next/link';
import { CustomUser } from '../../client/ClientListClient';
import { avgRating } from '@/lib/helper';

export default function HomeClientCard({ user }: { user: CustomUser }) {
  const rating = avgRating(user.reviewee).toFixed(1);
  return (
    <Link href={`/client/${user.id}`} className="block w-[240px] shrink-0">
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col items-center h-full">
        <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2">
          <Image
            src={user.pfp || '/default-profile.png'}
            alt={user.companyName}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-sm truncate text-center max-w-full">
          {user.companyName}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{rating}/5.0</p>
        <div className="flex flex-wrap justify-center gap-1 mt-auto">
          {user.skill.slice(0, 2).map((sk) => (
            <span
              key={sk.id}
              className="bg-muted text-foreground text-xs px-2 py-0.5 rounded-full"
            >
              {sk.name}
            </span>
          ))}
          {user.skill.length > 2 && (
            <span className="text-xs text-muted-foreground">+{user.skill.length - 2}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
