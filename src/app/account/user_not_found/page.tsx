"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner10 } from "react-icons/im";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      signOut();
      router.replace(`/account`);
    }, 3000);
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <div>Бүртгэлгүй хэрэглэгч байна.</div>
      <div className=" text-green-700 flex items-center gap-3">
        Буцаж байна.
        <ImSpinner10 className=" animate-spin" />
      </div>
    </div>
  );
}
