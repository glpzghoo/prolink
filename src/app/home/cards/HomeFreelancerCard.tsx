import Image from 'next/image';
import Link from 'next/link';
import { CustomUser } from '../../freelancer/FreelancerListClient';
import { avgRating } from '@/lib/helper';

export default function HomeFreelancerCard({ user }: { user: CustomUser }) {
  const rating = avgRating(user.reviewee).toFixed(1);
  const salary = user.salary.toLocaleString('mn-MN');
  const rateLabel =
    user.salaryType === 'HOUR' ? 'цаг' : user.salaryType === 'DAY' ? 'өдөр' : 'сар';
  return (
    <Link href={`/freelancer/${user.id}`} className="block w-[240px] shrink-0">
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col h-full">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={user.pfp || '/default-profile.png'}
              alt={user.firstName}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-sm truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-muted-foreground">{rating}/5.0</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
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
        <div className="mt-auto text-right text-sm font-medium text-green-500">
          {salary} ₮/{rateLabel}
        </div>
      </div>
    </Link>
  );
}
