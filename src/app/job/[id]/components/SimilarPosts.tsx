import Link from 'next/link';
import { job } from '@prisma/client';

export default function SimilarPosts({ posts }: { posts: job[] }) {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold text-foreground mb-3">Бусад төстэй зарууд</h3>
      {posts.length === 0 ? (
        <p className="text-foreground0">Төстэй пост алга</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {posts.map((j) => (
            <Link
              key={j.id}
              href={`/job/${j.id}`}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-foreground hover:bg-gray-200 transition"
            >
              {j.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
