'use client';
import CompanyCard from '@/app/_component/CompanyCard';
import { CustomJob } from './types';
import CustomSkeleton from '../_component/skeleton';
import { useState } from 'react';

export default function JobListClient({ posts }: { posts: CustomJob[] }) {
  const [loading] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="w-[90%] mx-auto">
        {loading ? (
          <CustomSkeleton />
        ) : (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-foreground">Идэвхитэй ажлын зарууд</h1>
            </div>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="transition-transform duration-300 hover:scale-[1.01]"
                  >
                    <CompanyCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-background rounded-lg shadow-md">
                <p className="text-foreground0 text-lg">Идэвхитэй ажлын зар байхгүй байна.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
