"use client";
import Loading from "@/app/_component/loading";
import { calculateTime } from "@/lib/helper";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type CustomJob = {
  id: string;
  title: string;
  salary: number;
  salaryRate: string;
  description: string;
  jobLocation: string;
  postedAt: string;
  jobPostView: number;
  experienced: string;
  status: string;
};

type CustomUser = {
  role: string;
  jobpost: CustomJob[];
};

export default function AboutSettings() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

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
    if (deleteJobId) return (
      <div>
        <Dialog>
          <DialogContent>
            <DialogDescription>
              <DialogTitle>Ажлын санал устгах</DialogTitle>
              <DialogHeader>Та энэ ажлын саналыг устгахдаа итгэлтэй байна уу?</DialogHeader>
              <Button onClick={() => setDeleteJobId(null)}>Тийм</Button>
              <Button onClick={() => deleteJob(jobId)}>Үгүй</Button>
            </DialogDescription>
        </DialogContent>
        </Dialog>
      </div>
    );

    try {
      const response = await axios.delete(`/api/job/post?id=${jobId}`);
      if (response.data.success) {
        <Dialog>
        <DialogContent>
          <DialogDescription>
            <DialogTitle>Ажлын санал устгах</DialogTitle>
            <DialogHeader>Та энэ ажлын саналыг устгахдаа итгэлтэй байна уу?</DialogHeader>
            <Button onClick={() => setDeleteJobId(null)}>Тийм</Button>
            <Button onClick={() => deleteJob(jobId)}>Үгүй</Button>
          </DialogDescription>
      </DialogContent>
      </Dialog>
        setRefresh(!refresh);
      } else {
        alert(`Алдаа гарлаа: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Устгах явцад алдаа гарлаа:", error);
      alert("Алдаа гарлаа! Дахин оролдоно уу.");
    }
  };

  const jobUpdate = async (jobId: string) => {
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
    <div className="bg-secondary flex flex-col items-center">
      {user?.role === "CLIENT" ? (
        <>
          {loading && <Loading />}
          <div className="bg-background w-1/2 shadow-lg p-4">
            <h2 className="font-bold mb-4">Таны оруулсан ажлын саналууд:</h2>
            {user.jobpost.length > 0 ? (
              <div className="flex justify-center flex-col p-2 py-2 gap-1">
                {user.jobpost.map((post, i) => (
                  <div
                    className={`${
                      user.jobpost.length > i + 1 && `border-b border-gray-200`
                    } py-5 relative flex flex-col gap-1`}
                    key={post.id}
                  > 
                    <div className=" flex justify-between">
                      <Link target="blank" href={`/job/${post.id}`}>
                        <div className="font-bold">{post.title}</div>
                      </Link>
                      <div className="flex justify-end font-semibold text-green-700 absolute top-0 right-0">
                        <div>Таны амласан цалин: {post.salary}</div>/
                        <div>
                          {post.salaryRate === "MONTH"
                            ? `сар`
                            : post.salaryRate === "DAY"
                            ? "өдөр"
                            : `цаг`}
                        </div>
                      </div>
                    </div>

                    <div>{post.description}</div>
                    <div>Байршил: {post.jobLocation}</div>
                    <div className="flex justify-between">
                      <div className="text-gray-400/70 text-xs absolute bottom-2 left-0">
                        Зар үүссэн огноо: {post.postedAt.split("T")[0]} (
                        {calculateTime(post.postedAt)})
                      </div>
                      <div className="flex absolute bottom-2 right-0">
                        <div>Харсан: </div>
                        <div>{post.jobPostView}</div>
                      </div>
                    </div>
                    <div>{post.experienced}</div>
                    <div>
                      {post.status === "ACTIVE" ? (
                        <div className="text-[#14A800] text-xs absolute top-0 left-0 flex items-center gap-1">
                          <GoDotFill className="animate-ping duration-4000" />
                          <p>Идэвхтэй пост</p>
                        </div>
                      ) : post.status === "CLOSED" ? (
                        <div className="text-pink-400/70 text-xs absolute top-0 left-0 flex items-center gap-1">
                          <p>Идэвхигүй пост</p>
                        </div>
                      ) : (
                        <div className="text-gray-400/70 text-xs absolute top-0 left-0 flex items-center gap-1">
                          <p>Ноорог пост</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => deleteJob(post.id)}
                        className="bg-red-600 text-white w-20 h-7"
                      >
                        Устгах
                      </Button>
                      <Button
                        onChange={() => jobUpdate(post.title && post.description)}
                        onClick={() => jobUpdate(post.id)}
                        className="bg-blue-600 text-white w-20 h-7"
                      >
                        Шинэчлэх
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Танд оруулсан ажлын санал алга!</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center min-h-screen content-center">
          Холбоос буруу байна!
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
