import Link from 'next/link';
import { CustomJob } from '../../job/types';

export default function HomeJobCard({ post }: { post: CustomJob }) {
  const salary = Number(post.salary).toLocaleString('mn-MN');
  const rateLabel =
    post.salaryRate === 'MONTH'
      ? 'сар'
      : post.salaryRate === 'DAY'
      ? 'өдөр'
      : 'цаг';
  return (
    <Link href={`/job/${post.id}`} className="block w-[240px] shrink-0">
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col h-full">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{post.title}</h3>
        <p className="text-xs text-muted-foreground mb-2 truncate">
          {post.poster.companyName}
        </p>
        <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1 my-2">
          {post.skill.slice(0, 2).map((sk) => (
            <span
              key={sk.id}
              className="bg-muted text-foreground text-xs px-2 py-0.5 rounded-full"
            >
              {sk.name}
            </span>
          ))}
          {post.skill.length > 2 && (
            <span className="text-xs text-muted-foreground">+{post.skill.length - 2}</span>
          )}
        </div>
        <div className="mt-auto text-right text-sm font-medium text-green-500">
          {salary} ₮/{rateLabel}
        </div>
      </div>
    </Link>
  );
}
