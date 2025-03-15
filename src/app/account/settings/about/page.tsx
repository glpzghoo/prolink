"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { responseData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { skill, user } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
type form = {
  about: string;
  skills: skill[];
};
type CustomSkill = skill & {
  user: user[];
};
export default function App() {
  const router = useRouter();
  const [form, setForm] = useState<form>({
    about: "",
    skills: [],
  });
  const [skills, setSkills] = useState<skill[]>([]);
  const [userInfo, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const [response2, setResponse2] = useState<responseData>();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/skills`);
        const res2 = await axios.get(`/api/account/user`);
        setSkills(res1.data.data.skills);
        setUserInfo(res2.data);
        if (res2.data.success) {
          const filter = res2.data.data.user.skill.map((one: CustomSkill) => {
            const { user, ...filtered } = one;
            return filtered;
          });
          setForm((prev) => {
            return {
              ...prev,
              skills: filter,
            };
          });
        } else {
          setResponse2(res2.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Хүсэлт илгээгээгүй");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const sendData = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/account/settings/about`, form);
      setResponse(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Хүсэлт илгээгээгүй");
    }
  };
  return userInfo ? (
    <div>
      {userInfo.success ? (
        <div className="min-h-screen">
          <div className="min-h-screen flex items-center justify-center">
            <div className="">
              <div className="w-[468px] min-h-[522px] px-3 flex flex-col gap-6">
                <div className="flex justify-center h-16 items-center border-b-2 font-bold">
                  {userInfo.data.user.role === "CLIENT"
                    ? "Байгууллагынхаа мэдээллийг энд засна уу!"
                    : "Байгууллагынхаа талаарх мэдээллийг энд засна уу!"}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div></div>
                    </div>
                    <div className="relative w-full">
                      <Label
                        htmlFor="about"
                        className={cn(`absolute left-3 top-1 text-gray-500 text-md transition-all 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 
          peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#108A00] ${
            form?.about && "top-1 text-[10px] text-[#108A00]"
          }`)}
                      >
                        {userInfo.data.user.companyName
                          ? `Байгууллагын тухай`
                          : `Миний тухай`}
                      </Label>
                      <Textarea
                        defaultValue={
                          userInfo.data.user.about
                            ? userInfo.data.user.about
                            : ""
                        }
                        onChange={(e) => {
                          setForm((prev) => {
                            return {
                              ...prev,
                              about: e.target.value,
                            };
                          });
                        }}
                        id="about"
                        className="rounded-none peer w-full border border-gray-300 px-3 pt-5 pb-2 text-lg focus:border-[#108A00] focus:outline-none"
                        name="about"
                      />
                      <div className=" text-[#717171] text-xs">
                        {userInfo.data.user.companyName
                          ? `Байгууллагын тухай дэлгэрэнгүй мэдээллийг оруулна уу!`
                          : `Ажил олгогчдод өөрийгөө танилцуулаарай!`}
                      </div>
                    </div>
                    {userInfo.data.user.role === "CLIENT" && (
                      <div className=" text-sm text-green-600">
                        Нээлттэй ажлын байраа сонгоно уу!
                      </div>
                    )}
                    <div className="flex whitespace-nowrap flex-wrap gap-1">
                      {skills.map((skill) => (
                        <Button
                          onClick={() => {
                            setForm((prev) => {
                              const skillExists = prev.skills.some(
                                (skill1) => skill1.id === skill.id
                              );

                              if (skillExists) {
                                return {
                                  ...prev,
                                  skills: prev.skills.filter(
                                    (skill1) => skill1.id !== skill.id
                                  ),
                                };
                              }

                              return {
                                ...prev,
                                skills: [...prev.skills, skill],
                              };
                            });
                          }}
                          key={skill.id}
                          className={`border p-1 rounded-2xl text-xs bg-background text-foreground hover:text-background cursor-pointer ${
                            form.skills.some(
                              (skill1) => skill1?.id === skill.id
                            )
                              ? "border-green-400"
                              : ""
                          }`}
                        >
                          {form.skills.some(
                            (skill1) => skill1?.id === skill.id
                          ) && `✓`}
                          {skill.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={sendData}
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#108A00]
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
                  <div className="flex justify-around">
                    <div
                      className={`${
                        response.success ? ` text-green-400` : `text-red-400`
                      }`}
                    >
                      <div>{response.message}</div>
                    </div>
                    {userInfo.data.user.companyName ? (
                      <Link href={`/client/${userInfo.data.user.id}`}>
                        Энд дарна уу!
                      </Link>
                    ) : (
                      <Link href={`/freelancer/${userInfo.data.user.id}`}>
                        Энд дарна уу!
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center min-h-screen content-center">
          {response2?.message}
        </div>
      )}
    </div>
  ) : (
    <div className="min-h-screen flex items-center gap-2 justify-center">
      <div>Түр хүлээнэ үү!</div>
      <div>
        <ImSpinner2 className="animate-spin" />
      </div>
    </div>
  );
}
