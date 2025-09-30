"use client";
import Image from "next/image";
import GoogleSession from "../_components/google";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import z from "zod";
import { responseData } from "@/lib/types";
import { Alert } from "@/components/ui/alert";
import { motion } from "framer-motion";

import { Button } from "@mui/material";
import Loading from "@/app/_component/loading";
import { SessionProvider } from "next-auth/react";
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[0-9]/, "Дор хаяж 1 тоо агуулсан байх ёстой");
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [otp, setOTP] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassLoading, setResetPass] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const LoginButtonEvent = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const EmailString = localStorage.getItem("email");
    const NameString = localStorage.getItem("firstName");
    if (NameString) {
      setName(NameString);
    }
    if (EmailString) {
      setEmail(EmailString);
    } else {
      router.replace(`/account`);
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (response?.code !== "CODE_SUCCESSFULLY_SENT") {
      timeout = setTimeout(() => {
        setResponse(undefined);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [response]);
  useEffect(() => {
    const result = passwordSchema.safeParse(password);
    if (result.success) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password]);
  const login = async () => {
    setLoading(true);
    try {
      if (response?.code === "CODE_SUCCESSFULLY_SENT") {
        const otpId = localStorage.getItem("otpId");
        const res = await axios.patch(`/api/account/password-reset`, {
          otp,
          id: otpId,
          email,
          password,
        });
        setResponse(res.data);
        setLoading(false);
        if (res.data.code === "OTP_MATCHED") {
          setTimeout(() => {
            router.refresh();
          }, 2000);
        }
        return;
      }
      const res = await axios.post(`/api/account/login`, {
        email,
        password1: password,
      });
      setResponse(res.data);
      if (res.data.success) {
        if (!res.data.data.user.companyName) {
          router.push(`/freelancer/${res.data.data.user.id}`);
        } else {
          router.push(`/client/${res.data.data.user.id}`);
        }
        sessionStorage.removeItem("hasRun");
      }
      setLoading(false);
    } catch (err) {
      console.error(err, "Сервэрийн асуудал");
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    setResetPass(true);

    try {
      const res = await axios.post(`/api/account/password-reset`, { email });
      setResponse(res.data);
      localStorage.setItem("otpId", res.data.data.id);
      setResetPass(false);
    } catch (err) {
      console.error(err, "server aldaa");
      setResetPass(false);
    }
  };
  const LoginEvent = () => {
    if (LoginButtonEvent.current) {
      LoginButtonEvent.current.click();
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen flex items-center justify-center">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: false }}
            className="p-10 rounded-lg shadow-xl  bg-background"
          >
            <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
              <div className="flex justify-center h-16 items-center border-b-2 font-bold">
                Нэвтрэх
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl">
                  Тавтай морил, <span className=" font-bold">{name}</span>
                </div>
                <div>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        LoginEvent();
                      }
                    }}
                    name="password"
                    placeholder="Нууц үг"
                  />
                </div>
                {response?.code === "CODE_SUCCESSFULLY_SENT" && (
                  <div>
                    <Input
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          LoginEvent();
                        }
                      }}
                      type="number"
                      onChange={(e) => {
                        setOTP(Number(e.target.value));
                      }}
                      name="otp"
                      placeholder="Нэг удаагийн код"
                    />
                  </div>
                )}
                {response?.code === "OTP_DIDN'T_MATCHED" && (
                  <div className=" text-red-400">
                    Нэг удаагийн код таарсангүй!
                  </div>
                )}
                {response?.code === "INCORRECT_PASSWORD" && (
                  <div className=" text-red-400">Нууц үг таарсангүй!</div>
                )}

                <div>
                  <Button
                    sx={{ color: "green" }}
                    ref={LoginButtonEvent}
                    onClick={login}
                    disabled={!isValid || loading}
                    type="submit"
                    className={`w-full  ${
                      !isValid ? `bg-foreground` : `bg-[#108A00]`
                    }`}
                  >
                    {loading ? <>Түр хүлээнэ үү!</> : "Үргэлжлүүлэх"}
                  </Button>
                  <Button
                    sx={{ color: "green", fontSize: "10px" }}
                    disabled={resetPassLoading}
                    className=" cursor-pointer"
                    onClick={resetPassword}
                  >
                    {resetPassLoading ? (
                      <div className="flex items-center">
                        Код илгээж байна...
                      </div>
                    ) : (
                      <div>
                        {response?.code === "CODE_SUCCESSFULLY_SENT" ? (
                          <div>Ахиж код авах</div>
                        ) : (
                          <>Нууц үгээ мартсан уу?</>
                        )}
                      </div>
                    )}
                  </Button>
                  {response?.code === "OTP_MATCHED" && (
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform h-full w-full bg-secondary/70">
                      <Alert className=" transition-all whitespace-nowrap flex justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform w-1/4 ">
                        <div>Нууц үг амжилттай солигдлоо!</div>
                      </Alert>
                    </div>
                  )}
                  {/* {response && (
                <div>
                  {!response.userExist ? (
                    <div className=" text-red-400 justify-self-center font-bold">
                      Хэрэглэгч бүртгэлгүй байна...
                    </div>
                  ) : (
                    <div>Тавтай морил</div>
                  )}
                </div>
              )} */}
                </div>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="border-b w-1/3"></div>
                <div className="flex text-xs">Эсвэл</div>
                <div className="border-b w-1/3"></div>
              </div>
              <div>
                {/* <Button
                  sx={{ color: "green" }}
                  className="w-full border bg-background text-foreground hover:bg-secondary  flex justify-around"
                >
                  <Image
                    src={`/img/facebook.svg`}
                    alt="facebook logo"
                    width={20}
                    height={20}
                  />
                  <div>Facebook -ээр нэвтрэх</div>
                  <div></div>
                  </Button> */}

                <SessionProvider>
                  <GoogleSession />
                </SessionProvider>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
