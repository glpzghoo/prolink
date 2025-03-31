"use client";
import CompanyCard from "@/app/_component/CompanyCard";
import { job } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../_component/loading";
import { CustomJob } from "./[id]/page";
import CustomSkeleton from "../_component/skeleton";

export default function Company() {
  const [posts, setPosts] = useState<CustomJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/job/allposts`);
      if (res.data.success) {
        setPosts(res.data.data.posts);
      }
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Идэвхитэй ажлын зарууд
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <CompanyCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">
                Идэвхитэй ажлын зар байхгүй байна.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
