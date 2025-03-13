"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { cn } from "@/lib/utils";
import Link from "next/link";
import z, { date } from "zod";
import { useRouter } from "next/navigation";
import { runInThisContext } from "node:vm";
import { responseData } from "@/lib/types";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Select } from "@mui/material";
const RegisterFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  pfp: z.string().url(),
  salary: z.number(),
  salaryType: z.string(),
  birthday: z.date().refine(
    (value) => {
      const currentYear = new Date().getFullYear();
      const birthdateYear = value.getFullYear();
      const currentMonth = new Date().getMonth();
      const birthdateMonth = value.getMonth();
      const currentDay = new Date().getDate();
      const birthdateDay = value.getDate();
      const isValid = currentYear - birthdateYear;
      if (isValid > 18) return true;
      if (isValid === 18) {
        if (currentMonth > birthdateMonth) return true;
        if (currentMonth === birthdateMonth && currentDay >= birthdateDay)
          return true;
      }
      return false;
    },
    { message: "user must be 18+" }
  ),
  role: z.enum(["CLIENT", "FREELANCER"]),
  phoneNumber: z.string().min(8),
  password: z
    .string()
    .min(8, "Дор хаяж 8-н оронтой байх ёстой")
    .regex(/[0-9]/, "Дор хаяж 1 тоо агуулсан байх ёстой"),
});
export default function Login() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUploading, setImageUploading] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthday: new Date(new Date().toISOString().split("T")[0]),
    role: "FREELANCER",
    companyName: "",
    phoneNumber: "",
    salary: 10000,
    salaryType: "HOUR",
    password: "",
    pfp: "",
  });
  const [error, setError] = useState({
    email: false,
    firstName: false,
    lastName: false,
    birthday: false,
    role: false,
    phoneNumber: false,
    salary: false,
    salaryType: false,
    password: false,
    pfp: false,
  });
  const [loading, setLoading] = useState(false);
  const imageDiv = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("email");
    const formString = localStorage.getItem("form");
    const formLocalStrorage = formString ? JSON.parse(formString) : {};
    setForm({
      ...form,
      ...formLocalStrorage,
      birthday: new Date(formLocalStrorage.birthday),
    });
    if (emailFromLocalStorage) {
      setForm((p) => ({ ...p, email: emailFromLocalStorage }));
    } else {
      router.replace(`/account`);
    }
  }, []);
  useEffect(() => {
    const result = RegisterFormSchema.safeParse(form);
    if (result.success) {
      setIsValid(true);
      setError({
        email: false,
        firstName: false,
        lastName: false,
        birthday: false,
        role: false,
        salary: false,
        salaryType: false,
        phoneNumber: false,
        password: false,
        pfp: false,
      });
    } else {
      setIsValid(false);
      const errors = result.error.formErrors.fieldErrors;
      setError({
        email: !!errors.email,
        firstName: !!errors.firstName,
        lastName: !!errors.lastName,
        birthday: !!errors.birthday,
        salary: !!errors.salary,
        salaryType: !!errors.salaryType,
        role: !!errors.role,
        phoneNumber: !!errors.phoneNumber,
        password: !!errors.password,
        pfp: !!errors.pfp,
      });
    }
  }, [form]);
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = event.target.name;
    const { value } = event.target;
    if (field === "birthday") {
      setForm((p) => ({ ...p, [field]: new Date(value) }));
    } else if (field === `salary`) {
      setForm((p) => ({ ...p, [field]: Number(value) }));
    } else {
      setForm((p) => ({ ...p, [field]: value }));
    }
    const { password, ...withoutPass } = form;
    localStorage.setItem("form", JSON.stringify(withoutPass));
  };
  const sendData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/register`, form);
      setLoading(false);
      localStorage.removeItem("form");
      localStorage.removeItem("email");
      setResponse(res.data);
      if (res.data.code === `NEW_USER`) {
        setTimeout(() => {
          router.push(`/account/login`);
        }, 2000);
      }
    } catch (err) {
      console.error(err, "server error");
      setLoading(false);
      setResponse({
        message: "Сервертэй холбогдож чадсангүй!",
        success: false,
      });
    }
  };
  const imageD = () => {
    if (imageDiv.current) {
      imageDiv.current.click();
    }
  };
  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageUploading(true);
    try {
      const file = event.target.files[0];
      const response1 = await fetch(`/api/sign-cloudinary`);
      const { timestamp, signature, api_key } = await response1.json();
      const data = new FormData();
      data.append("file", file);
      data.append("timestamp", timestamp.toString());
      data.append("signature", signature);
      data.append("api_key", api_key);
      data.append("resource_type", "image");
      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/de1g2bwml/image/upload`,
        data,
        {
          onUploadProgress: (progress) => {
            if (progress.total) {
              const percent = Math.round(
                (progress.loaded * 100) / progress.total
              );
              setProgress(percent);
            }
          },
        }
      );

      if (response2.data) {
        setForm((p) => ({ ...p, pfp: response2.data.secure_url }));
        const { password, ...withoutPass } = form;
        localStorage.setItem("form", JSON.stringify(withoutPass));
        setImageUploading(false);
        return;
      }
      setImageUploading(false);
    } catch (err) {
      console.error(err, "server error");
    }
  };
  console.log(form);
  return (
    <div className="min-h-screen -mt-15">
      <div className="min-h-screen flex items-center justify-center">
        <div className="">
          <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
            <div className="flex justify-center h-16 items-center border-b-2 font-bold">
              Бүртгүүлэх
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-6">
                <div>
                  <div>
                    <div className="flex flex-col justify-center items-center ">
                      <div className="text-2xl font-semibold">
                        Profile зураг оруулна уу!
                      </div>
                      <Input
                        ref={imageDiv}
                        onChange={imageUpload}
                        type="file"
                        className="hidden"
                      />
                      {imageUploading && (
                        <div>Зураг оруулж байна... {progress}%</div>
                      )}
                      <div
                        onClick={imageD}
                        className="rounded-full border w-25 h-25 flex border-gray-600 overflow-hidden relative"
                      >
                        {imageUploading && (
                          <CircularProgress
                            variant="determinate"
                            value={progress}
                            size={110}
                            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-25 h-25 text-[#108A00]"
                          />
                        )}

                        <Image
                          src={form.pfp ? form.pfp : `/window.svg`}
                          alt="pfp"
                          className=""
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <Input
                      id="lastName"
                      defaultValue={form.lastName || ""}
                      onChange={onChange}
                      name="lastName"
                      className={cn(
                        `rounded-b-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none`
                      )}
                    />
                    <Label
                      htmlFor="lastName"
                      className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.lastName && "top-1 text-[10px] text-[#108A00]"
        }`)}
                    >
                      Овог
                    </Label>
                  </div>
                  <div className="relative w-full">
                    <Input
                      id="firstName"
                      defaultValue={form.firstName || ""}
                      onChange={onChange}
                      name="firstName"
                      className={cn(
                        `rounded-t-none peer w-full border border-gray-300  px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none`
                      )}
                    />
                    <Label
                      htmlFor="firstName"
                      className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.firstName && "top-1 text-[10px] text-[#108A00]"
        }`)}
                    >
                      Нэр
                    </Label>
                    {(form.firstName || form.lastName) &&
                      (error.firstName || error.lastName) && (
                        <div className="text-red-400">
                          Овог, Нэрээ оруулна уу!
                        </div>
                      )}
                  </div>
                </div>
                <div>
                  <Input
                    type="date"
                    className="rounded-b-none"
                    onChange={onChange}
                    defaultValue={
                      form.birthday instanceof String
                        ? form.birthday.split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    name="birthday"
                    placeholder="Төрсөн өдөр"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <div
                    className={` text-xs ${
                      error.birthday ? ` text-red-400` : `text-[#717171]`
                    }`}
                  >
                    Манайд бүртгүүлэхэд заавал 18 хүрсэн байх ёстой.
                  </div>
                </div>
                <div>
                  <div className="relative w-full">
                    <Input
                      disabled
                      id="email"
                      type="email"
                      className="rounded-none"
                      onChange={onChange}
                      defaultValue={form.email}
                      name="email"
                    />
                  </div>
                  <div className="flex justify-between whitespace-nowrap">
                    <div className=" text-[#717171] text-xs">
                      Танд санал ирвэл, бид майл илгээх болно.
                    </div>
                    <div>
                      <Link
                        className="text-xs underline justify-self-end w-full"
                        href={`/account`}
                      >
                        Email солих
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative w-full">
                  <Input
                    id="companyName"
                    type="text"
                    className="rounded-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none"
                    onChange={onChange}
                    defaultValue={form.companyName || ""}
                    name="companyName"
                  />
                  <Label
                    htmlFor="companyName"
                    className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.companyName && "top-1 text-[10px] text-[#108A00]"
        }`)}
                  >
                    Компаний нэр
                  </Label>
                </div>
                <div className="relative w-full">
                  <Input
                    id="phoneNumber"
                    type="number"
                    className="rounded-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none"
                    onChange={onChange}
                    name="phoneNumber"
                    defaultValue={form.phoneNumber || ""}
                  />
                  <Label
                    htmlFor="phoneNumber"
                    className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.phoneNumber && "top-1 text-[10px] text-[#108A00]"
        }`)}
                  >
                    Утасны дугаар
                  </Label>
                  <div className=" text-[#717171] text-xs">
                    Ажил олгогч тантай холбогдох болно.
                  </div>
                  {form.phoneNumber && (
                    <div>
                      {error.phoneNumber && (
                        <div className="text-xs text-red-400">
                          Утасны дугаар заавал 8+ оронтой байх ёстой!
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative w-full">
                  <div className=" flex">
                    <Input
                      id="salary"
                      type="number"
                      className="rounded-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none"
                      onChange={onChange}
                      name="salary"
                      defaultValue={form.salary || ""}
                    />
                    <select
                      onChange={onChange}
                      name="salaryType"
                      defaultValue={form.salaryType}
                      className=" border w-20"
                    >
                      <option value={`HOUR`}>Цаг</option>
                      <option value={`MONTH`}>Сар</option>
                    </select>
                  </div>
                  <Label
                    htmlFor="salary"
                    className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.phoneNumber && "top-1 text-[10px] text-[#108A00]"
        }`)}
                  >
                    Таны цалингийн хүлээлт
                  </Label>
                  <div className=" text-[#717171] text-xs">
                    <span className=" italic">оруулаагүй бол : </span> 10000/цаг
                  </div>
                  {form.salary ? (
                    <div>
                      {error.salary && (
                        <div className="text-xs text-red-400">
                          Цалингийн хүлээлт заавал оруулна!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="relative w-full">
                  <Input
                    id="password"
                    type="password"
                    className="rounded-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none"
                    onChange={onChange}
                    name="password"
                  />
                  <Label
                    htmlFor="password"
                    className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
        peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
          form.password && "top-2 text-[10px] text-[#108A00]"
        }`)}
                  >
                    Нууц үг
                  </Label>
                  {error.password && (
                    <div>
                      {form.password && (
                        <div className="text-xs text-red-400">
                          Нууц үг заавал 8+ дээш оронтой бас тоо агуулсан байх
                          ёстой
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Button
                  disabled={!isValid || loading}
                  onClick={sendData}
                  type="submit"
                  className={`w-full  ${
                    isValid ? `bg-[#108A00]` : ` bg-foreground`
                  }`}
                >
                  {loading ? (
                    <>
                      Түр хүлээнэ үү!
                      <ImSpinner2 className="animate-spin" />
                    </>
                  ) : (
                    "Зөвшөөрөөд үргэлжлүүлэх"
                  )}
                </Button>
                {response && (
                  <div className="flex justify-between">
                    <div
                      className={`${
                        response.success ? `text-green-500 ` : `text-red-400`
                      } `}
                    >
                      {response.message}
                    </div>
                    {response?.code === "USER_EXISTS" && (
                      <Link href={`/account/login`}>Нэвтрэх</Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
