'use client';
import Link from 'next/link';
import { CustomJob } from '../job/types';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { calculateTime } from '@/lib/helper';
import { Building } from 'lucide-react';

type Props = {
  post: CustomJob;
};

export default function CompanyCard({ post }: Props) {
  const formattedSalary = Number(post.salary).toLocaleString('mn-MN');

  return (
    <Link href={`/job/${post.id}`} className="block h-full">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full w-full">
        <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
          <div className="flex flex-col max-w-[70%]">
            <h3
              title={post.title}
              className="text-lg font-semibold text-foreground hover:text-primary truncate transition-colors"
            >
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground">{calculateTime(post.postedAt)}</p>
          </div>
          <div className="text-xs font-medium">
            {post.status === 'ACTIVE' ? (
              <div className="text-green-500 flex items-center gap-1">
                <GoDotFill className="animate-pulse text-sm" />
                <span>Идэвхитэй</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Идэвхигүй</span>
            )}
          </div>
        </div>
        <div
          title={post.poster.companyName}
          className="flex items-center gap-2 text-sm text-foreground overflow-hidden mb-3"
        >
          <Building className="w-4 h-4" />
          <span className="font-semibold truncate">{post.poster.companyName}</span>
        </div>
        <p
          title={post.description}
          className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1"
        >
          {post.description}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {post.skill.length === 0 ? (
              <span className="text-xs italic text-muted-foreground">
                Ур чадварын шаардлага байхгүй
              </span>
            ) : (
              post.skill.slice(0, 5).map((ski) => (
                <span
                  key={ski.id}
                  className="bg-muted text-foreground text-xs font-medium px-2 py-0.5 rounded-full hover:bg-accent transition-colors"
                >
                  {ski.name}
                </span>
              ))
            )}
            {post.skill.length > 5 && (
              <span className="text-xs text-muted-foreground">+{post.skill.length - 5}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MdOutlineRemoveRedEye className="text-base" />
              <span className="text-xs font-medium">{post.jobPostView}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                {formattedSalary} ₮
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-0.5 rounded">
                {post.salaryRate === 'MONTH'
                  ? 'сард'
                  : post.salaryRate === 'DAY'
                  ? 'өдөрт'
                  : 'цагт'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
