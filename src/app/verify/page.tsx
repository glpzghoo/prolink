"use client";

import { responseData } from "@/lib/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loading from "../_component/loading";

export default function App() {
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp");
  const router = useRouter();

  const [response, setResponse] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!otp) {
      router.replace(`/job`);
    }
    sendOTP();
  }, []);
  const sendOTP = async () => {
    try {
      const res = await axios.post(`/api/account/verifyEmail?otp=${otp}`);
      setResponse(res.data);
      if (res.data.success) {
        setTimeout(() => {
          router.push(`/job`);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex min-h-screen items-center justify-center">
            {response?.message}
          </div>
        )}
      </div>
    </Suspense>
  );
}
