'use client';
import { CustomJob } from '../job/types';
import CompanyCard from '../_component/CompanyCard';
import { useDragScroll } from './useDragScroll';

export default function JobSection({ posts }: { posts: CustomJob[] }) {
  const { ref, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  if (posts.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Ажлын зарууд</h2>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing py-2"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {posts.map((post) => (
          <div key={post.id} className="min-w-[300px]">
            <CompanyCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
