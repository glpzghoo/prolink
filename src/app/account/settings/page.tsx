"use client";

import { Label } from "@/components/ui/label";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Input,
  List,
  ListItem,
} from "@mui/material";
import { user } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AccountSettings() {
  const [salaryType, setSalaryType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<user>();
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    salary: 0,
    salaryType: "MONTH",
    pfp: "",
    role: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const clickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/account`);
      if (res.data.success) {
        setUser(res.data.data.informations);
        setForm(res.data.data.informations);
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
  console.log(form);
  return (
    <div className="flex justify-center">
      <div className=" bg-background w-1/2 flex flex-col gap-12 h-screen">
        {/* <Button onClick={handleOpen}>asdfasd</Button> */}
        <Dialog className="" open={open}>
          <div className=" rounded-4xl p-10 flex flex-col gap-6">
            <Input placeholder="Нууц үгээ оруулна уу!" />
            <div className="flex justify-center gap-1">
              <Button sx={{ color: "green" }}>Солих</Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ color: "black" }}
              >
                Болих
              </Button>
            </div>
          </div>
        </Dialog>
        <div className=" p-20">
          Хэрэглэгчийн Статус:{" "}
          {form.role === "CLIENT"
            ? "Компани/Үйлчлүүлэгч"
            : "Freelancer/Ажил горилогч"}
        </div>
        <div className=" flex flex-col justify-around">
          <div className=" flex items-center justify-center">
            <Image
              onClick={clickInput}
              src={`/img/facebook.svg`}
              width={100}
              height={100}
              alt="pfp"
              className=" rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center">
            <input type="file" className="hidden" ref={inputRef} />
            <div className="flex gap-3">
              <Input
                onChange={(e) => {
                  setForm((prev) => {
                    return {
                      ...prev,
                      lastName: e.target.value,
                    };
                  });
                }}
                value={user?.lastName ? user.lastName : ""}
                disabled={loading}
                placeholder="Овог"
              />
              <Input
                value={user?.firstName ? user.firstName : ""}
                disabled={loading}
                placeholder="Нэр"
              />
            </div>
            <div className="flex gap-3">
              <Input
                value={user?.phoneNumber ? user.phoneNumber : ""}
                disabled={loading}
                placeholder="Утасны дугаар"
              />
              <Input
                value={user?.email ? user.email : ""}
                disabled={loading}
                placeholder="Емайл"
              />
            </div>
            <div className="flex">
              <Input
                value={user?.salary ? user.salary : ""}
                disabled={loading}
                placeholder="Цалингийн хүлээлт"
                type="number"
              />
              <div className="flex gap-1">
                {["MONTH", "DAY", "HOUR"].map((type) => (
                  <div key={type} className="flex">
                    <Checkbox
                      sx={{ color: "green" }}
                      onChange={(e) => {
                        setSalaryType(type);
                      }}
                      checked={user?.salaryType === type}
                      id={type}
                      name="SalaryType"
                    />
                    <Label htmlFor={type}>
                      {type === "MONTH"
                        ? "Сар"
                        : type === "HOUR"
                        ? "Цаг"
                        : "Өдөр"}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
