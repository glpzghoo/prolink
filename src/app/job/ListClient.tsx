"use client";
import { useEffect, useState } from "react";
import CompanyCard from "@/app/_component/CompanyCard";
import CustomSkeleton from "../_component/skeleton";
import { CustomJob } from "./[id]/page";

export default function ListClient({ initialPosts }: { initialPosts: CustomJob[] }) {
  const [posts, setPosts] = useState<CustomJob[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Идэвхитэй ажлын зарууд</h1>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                  <CompanyCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">Идэвхитэй ажлын зар байхгүй байна.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
