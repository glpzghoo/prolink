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
        const sortedPosts = res.data.data.posts.sort(
          (post1: CustomJob, post2: CustomJob) => {
            return post2.jobPostView - post1.jobPostView;
          }
        );
        setPosts(sortedPosts);
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
  return loading ? (
    <CustomSkeleton />
  ) : (
    <div className="flex flex-wrap gap-5 justify-center">
      {posts.length !== 0
        ? posts.map((post) => <CompanyCard key={post.id} post={post} />)
        : `Одоогоор пост алга байна`}
    </div>
  );
}
