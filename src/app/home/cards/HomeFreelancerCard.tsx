import Image from 'next/image';
import Link from 'next/link';
import { CustomUser } from '../../freelancer/FreelancerListClient';
import { avgRating } from '@/lib/helper';

export default function HomeFreelancerCard({ user }: { user: CustomUser }) {
  const rating = avgRating(user.reviewee).toFixed(1);

  return (
    <div className="block w-[320px] shrink-0 hover:scale-[1.02] transition-transform">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
        {/* Avatar & Info */}
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-muted">
            <Image
              src={user.pfp || '/default-profile.png'}
              alt={user.firstName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{rating}/5.0 үнэлгээтэй</p>
          </div>
        </div>

        {/* Skills (smaller) */}
        <div className="flex flex-wrap gap-1 mt-3 min-h-[20px]">
          {user.skill.slice(0, 2).map((sk) => (
            <span key={sk.id} className="bg-muted text-foreground text-xs px-2 py-0.5 rounded-full">
              {sk.name}
            </span>
          ))}
          {user.skill.length > 2 && (
            <span className="text-xs text-muted-foreground">+{user.skill.length - 2}</span>
          )}
        </div>

        {/* About me in the middle */}
        {user.about && (
          <p className="mt-4 text-sm text-muted-foreground line-clamp-3 leading-snug text-center">
            "{user.about}"
          </p>
        )}

        {/* Bottom-right link */}
        <Link
          href={`/freelancer/${user.id}`}
          className="mt-auto self-end text-sm text-primary hover:underline"
          target="_blank"
        >
          Дэлгэрэнгүй →
        </Link>
      </div>
    </div>
  );
}
