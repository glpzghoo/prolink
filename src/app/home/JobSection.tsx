'use client';
import { CustomJob } from '../job/types';
import { useDragScroll } from './useDragScroll';
import HomeJobCard from './cards/HomeJobCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function JobSection({ posts }: { posts: CustomJob[] }) {
  const { ref, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  if (posts.length === 0) return null;
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ажлын зарууд</h2>
        <Link href="/job">
          <Button variant="link" size="sm" className="p-0">
            Дэлгэрэнгүй
          </Button>
        </Link>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-2"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {posts.map((post) => (
          <HomeJobCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
