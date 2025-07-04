import Image from 'next/image';
import Link from 'next/link';
import { avgRating } from '@/lib/helper';
import { CustomUser } from '@/app/freelancer/FreelancerListClient';

export default function HomeClientCard({ user }: { user: CustomUser }) {
  const rating = avgRating(user.reviewee).toFixed(1);

  return (
    <Link
      href={`/client/${user.id}`}
      className="block w-[280px] shrink-0 hover:scale-[1.02] transition-transform"
    >
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col items-center h-full hover:shadow-md transition-shadow">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-muted mb-3">
          <Image
            src={user.pfp || '/default-profile.png'}
            alt={user.companyName}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-base text-center truncate max-w-full">
          {user.companyName}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{rating}/5.0 үнэлгээтэй</p>
        <div className="flex flex-wrap justify-center gap-1 mt-auto min-h-[24px]">
          {user.skill.slice(0, 2).map((sk) => (
            <span
              key={sk.id}
              className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full"
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
