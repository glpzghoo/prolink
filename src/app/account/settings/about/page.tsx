"use client";
import Loading from "@/app/_component/loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { responseData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Snackbar } from "@mui/material";
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

export default function AboutSettings() {
  const router = useRouter();
  const [form, setForm] = useState<form>({
    about: "",
    skills: [],
  });
  const [skills, setSkills] = useState<skill[]>([]);
  const [userInfo, setUserInfo] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<responseData>();
  const [response2, setResponse2] = useState<responseData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/skills`);

        if (res1.data.success) {
          const filtered = res1.data.data.skills.map((one: CustomSkill) => {
            const { user, ...filtered } = one;
            return filtered;
          });
          setSkills(filtered);
        }

        const res2 = await axios.get(`/api/account/user`);
        setUserInfo(res2.data);

        if (res2.data.success) {
          const filter = res2.data.data.user.skill.map((one: CustomSkill) => {
            const { user, ...filtered } = one;
            return filtered;
          });
          setForm((prev) => ({ ...prev, skills: filter }));
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [response]);

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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      {userInfo.success ? (
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-center text-gray-800 border-b pb-4">
            {userInfo.data.user.role !== "CLIENT"
              ? "Өөрийнхөө мэдээллийг энд засна уу!"
              : "Байгууллагынхаа талаарх мэдээллийг энд засна уу!"}
          </h2>
          <div className="mt-6 space-y-6">
            <Snackbar
              sx={{ color: response?.success ? "green" : "red" }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(response?.success)}
              message={response?.message}
            />
            <div>
              <Label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                {userInfo.data.user.companyName
                  ? "Байгууллагын тухай"
                  : "Миний тухай"}
              </Label>
              <Textarea
                defaultValue={userInfo.data.user.about || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, about: e.target.value }))
                }
                id="about"
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-800 focus:border-green-500 focus:ring-green-500"
                name="about"
              />
              <p className="text-xs text-gray-500 mt-1">
                {userInfo.data.user.role === "CLIENT"
                  ? "Байгууллагын тухай дэлгэрэнгүй мэдээллийг оруулна уу!"
                  : "Ажил олгогчдод өөрийгөө танилцуулаарай!"}
              </p>
            </div>

            {userInfo.data.user.role === "CLIENT" && (
              <p className="text-sm text-green-600">
                Нээлттэй ажлын байраа сонгоно уу!
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Button
                  onClick={() => {
                    setForm((prev) => {
                      const skillExists = prev.skills.some(
                        (skill1) => skill1.id === skill.id
                      );
                      return skillExists
                        ? {
                            ...prev,
                            skills: prev.skills.filter(
                              (skill1) => skill1.id !== skill.id
                            ),
                          }
                        : { ...prev, skills: [...prev.skills, skill] };
                    });
                  }}
                  key={skill.id}
                  className={`border p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                    form.skills.some((skill1) => skill1?.id === skill.id)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {form.skills.some((skill1) => skill1?.id === skill.id) &&
                    "✓ "}
                  {skill.name}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={sendData}
            disabled={loading}
            className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? (
              <>
                Түр хүлээнэ үү! <ImSpinner2 className="animate-spin ml-2" />
              </>
            ) : (
              "Үргэлжлүүлэх"
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center text-gray-600">{response2?.message}</div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
