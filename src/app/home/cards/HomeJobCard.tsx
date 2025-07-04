import Link from 'next/link';
import { CustomJob } from '../../job/types';
import { ImNewTab } from 'react-icons/im';

export default function HomeJobCard({ post }: { post: CustomJob }) {
  const salary = Number(post.salary).toLocaleString('mn-MN');
  const rateLabel =
    post.salaryRate === 'MONTH' ? 'сар' : post.salaryRate === 'DAY' ? 'өдөр' : 'цаг';

  return (
    <div className="block w-[280px] shrink-0 hover:scale-[1.02] transition-transform">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-base line-clamp-2 mb-1 text-foreground">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 truncate">{post.poster.companyName}</p>
        <p className="text-sm text-muted-foreground text-center line-clamp-3 mb-3">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-auto mb-3 min-h-[24px]">
          {post.skill.slice(0, 2).map((sk) => (
            <span key={sk.id} className="bg-muted text-foreground text-xs px-2 py-0.5 rounded-full">
              {sk.name}
            </span>
          ))}
          {post.skill.length > 2 && (
            <span className="text-xs text-muted-foreground">+{post.skill.length - 2}</span>
          )}
        </div>
        <div className=" flex  justify-between">
          <div className="text-base font-semibold text-green-500">
            {salary} ₮/{rateLabel}
          </div>
          <Link href={`/job/${post.id}`} target="_blank">
            <ImNewTab />
          </Link>
        </div>
      </div>
    </div>
  );
}
