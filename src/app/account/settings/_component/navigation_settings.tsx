"use client";
import { responseData } from "@/lib/types";
import { Button } from "@mui/material";
import { user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavigationSettings() {
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const res = await axios.get(`/api/account`);
    if (res.data.success) {
      setUser(res.data.data.informations);
    }
  };
  useEffect(() => {
    try {
      getInfo();
    } catch (err) {
      console.error(err, "Сервертэй холбогдож чадсангүй!");
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="bg-background flex justify-center gap-2">
      <div>
        <Link href={`/account/settings/skills`}>
          <Button sx={{ color: `green`, textTransform: "capitalize" }}>
            Профайл
          </Button>
        </Link>
        {user?.role === "CLIENT" && (
          <Link href={`/account/settings/jobs`}>
            <Button sx={{ color: `green`, textTransform: "capitalize" }}>
              Ажлын саналууд
            </Button>
          </Link>
        )}
        <Link href={`/account/settings/application`}>
          <Button sx={{ color: `green`, textTransform: "capitalize" }}>
            Анкет
          </Button>
        </Link>
        <Link href={`/account/settings/about`}>
          <Button sx={{ color: `green`, textTransform: "capitalize" }}>
            Тухай
          </Button>
        </Link>
        <Link href={`/account/settings`}>
          <Button sx={{ color: `green`, textTransform: "capitalize" }}>
            Аккаунтны тохиргоо
          </Button>
        </Link>
      </div>
    </div>
  );
}
