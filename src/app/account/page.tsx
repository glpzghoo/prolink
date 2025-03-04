"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import z from "zod";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { responseData } from "@/lib/types";
import GoogleSession from "./_components/google";
type LoginForm = {
  email: string;
  password: string;
};
type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: "CLIENT" | "FREELANCER";
  companyName: string;
  phoneNumber: number;
  password: string;
};
const LoginFromSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const emailSchema = z.string().email();
export default function Account() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const router = useRouter();
  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("email");
    if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }
  }, []);
  useEffect(() => {
    setResponse(undefined);

    const result = emailSchema.safeParse(email);
    if (result.success) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email]);

  const onClick = async () => {
    setResponse(undefined);
    setLoading(true);
    const res = await axios.post(`/api/account`, { email });
    console.log(res.data);
    setLoading(false);
    setResponse(res.data);
    localStorage.setItem("email", email);
    if (res.data.userExist) {
      localStorage.setItem("firstName", res.data.data.name);
      router.push(`/account/login`);
    } else {
      router.push("/account/register");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
          <div className="flex justify-center h-16 items-center border-b-2 font-bold">
            Нэвтрэх эсвэл бүртгүүлэх
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl">Тавтай морил</div>
            <div>
              <Input
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <Button
                onClick={onClick}
                disabled={isValid || loading}
                type="submit"
                className={`w-full  ${
                  isValid ? `bg-foreground` : `bg-[#108A00]`
                }`}
              >
                {loading ? (
                  <>
                    Түр хүлээнэ үү!
                    <ImSpinner2 className="animate-spin" />
                  </>
                ) : (
                  "Үргэлжлүүлэх"
                )}
              </Button>
              {response && (
                <div>
                  {!response.userExist ? (
                    <div className=" text-red-400 justify-self-center font-bold">
                      Хэрэглэгч бүртгэлгүй байна...
                    </div>
                  ) : (
                    <div>Тавтай морил</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="border-b w-1/3"></div>
            <div className="flex text-xs">Эсвэл</div>
            <div className="border-b w-1/3"></div>
          </div>
          <div>
            <Button className="w-full border bg-background text-foreground hover:bg-secondary  flex justify-around">
              <Image
                src={`/img/facebook.svg`}
                alt="facebook logo"
                width={20}
                height={20}
              />
              <div>Facebook -ээр нэвтрэх</div>
              <div></div>
            </Button>
          </div>
          <div>
            <GoogleSession />
          </div>
        </div>
      </div>
    </div>
  );
}
