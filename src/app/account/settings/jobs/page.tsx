"use client";
import Loading from "@/app/_component/loading";
import { Button } from "@/components/ui/button";
import { calculateTime } from "@/lib/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type CustomJob = {
  id: string;
  title: string;
  description: string;
  jobLocation: string;
  salary: number;
  salaryRate: string;
  postedAt: string;
  jobPostView: number;
  status: string;
};

type CustomUser = {
  role: string;
  jobpost: CustomJob[];
};

export default function AboutSettings() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get("/api/account");
        if (res.data.success) {
          setUser(res.data.data.informations);
        }
      } catch (err) {
        console.error("Сервертэй холбогдож чадсангүй!", err);
      } finally {
        setLoading(false);
      }
    };
    getInfo();
  }, []);

  const deleteJob = async (jobId: string) => {
    if (!confirm("")) 
      return (
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      );
    try {
      const response = await axios.delete(`/api/job/post?id=${jobId}`);
      if (response.data.success) {
        alert("Ажлын санал амжилттай устгагдлаа!");
        setUser((prev) =>
          prev ? { ...prev, jobpost: prev.jobpost.filter((job) => job.id !== jobId) } : prev
        );
      } else {
        alert(`Алдаа гарлаа: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Устгах явцад алдаа гарлаа:", error);
      alert("Алдаа гарлаа!");
    }
  };

  const updateJob = async (jobId: string) => {
    if (!confirm("Энэ ажлын саналыг шинэчлэхдээ итгэлтэй байна уу?")) return;

    try {
      const response = await axios.put(`/api/job/post?id=${jobId}`);
      if (response.data.success) {
        alert("Ажлын санал амжилттай шинэчлэгдлээ!");
        router.refresh();
      } else {
        alert(`Алдаа гарлаа: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Шинэчлэх явцад алдаа гарлаа:", error);
      alert("Шинэчлэх явцад алдаа гарлаа!");
    }
  };

  return !loading && user ? (
    <div className="bg-secondary flex justify-center">
      {user?.role === "CLIENT" ? (
        <div className="bg-background w-1/2 shadow-lg p-4">
          <h2 className="font-bold mb-4">Таны оруулсан ажлын саналууд:</h2>
          {user.jobpost.length > 0 ? (
            user.jobpost.map((post) => (
              <div key={post.id} className="border-b border-gray-200 py-5 relative">
                <Link href={`/job/${post.id}`} target="_blank">
                  <h3 className="font-bold">{post.title}</h3>
                </Link>
                <p>{post.description}</p>
                <p>Байршил: {post.jobLocation}</p>
                <p>Таны амласан цалин: {post.salary} ({post.salaryRate})</p>
                <p className="text-gray-400 text-xs">
                  Зар үүссэн: {post.postedAt.split("T")[0]} ({calculateTime(post.postedAt)})
                </p>
                <p className="text-gray-400 text-xs">Харсан: {post.jobPostView}</p>
                {post.status === "ACTIVE" && (
                  <p className="text-green-600 flex items-center gap-1">
                    <GoDotFill className="animate-ping" /> Идэвхтэй пост
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  <Button className="bg-green-600 text-white" onClick={() => deleteJob(post.id)}>
                    Устгах
                  </Button>
                  <Button className="bg-green-600 text-white" onClick={() => updateJob(post.id)}>
                    Засах
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>Таньд оруулсан ажлын санал алга!</p>
          )}
        </div>
      ) : (
        <div className="text-center min-h-screen content-center">Холбоос буруу байна!</div>
      )}
    </div>
  ) : (
    <Loading />
  );
}