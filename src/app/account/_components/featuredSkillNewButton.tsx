"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { responseData } from "@/lib/types";
import { Button, Input, Select, Switch, TextareaAutosize } from "@mui/material";
import { skill } from "@prisma/client";
import { DatePicker } from "@mui/x-date-pickers-pro";

import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import z from "zod";
import { CustomFeaturedSkill } from "@/app/freelancer/[id]/page";
import Link from "next/link";
const formSchema = z
  .object({
    skill: z.string(),
    detail: z.string(),
    startedAt: z.date(),
    present: z.boolean(),
    endedAt: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.present && !data.endedAt) {
      ctx.addIssue({
        path: ["endedAt"],
        code: "custom",
        message: "endedAt is required when present is not checked",
      });
    }
  });
type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  featured: CustomFeaturedSkill[];
};
export const FeaturedSkillNewButton = ({
  setRefresh,
  refresh,
  featured,
}: Props) => {
  const [form, setForm] = useState({
    present: false,
    skill: "",
  });
  const [loading, setLoading] = useState(true);
  const [FormValid, setFormValid] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const [response2, setResponse2] = useState<responseData>();
  const [skills, setSkills] = useState<skill[]>();
  useEffect(() => {
    const result = formSchema.safeParse(form);
    if (result.success) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [form]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/account`);
        if (res1.data.success) {
          const filterSkills = res1.data.data.informations.skill.filter(
            (skil: skill) => {
              const filter = featured.some((ski) => ski.skillId === skil.id);
              return !filter;
            }
          );
          setSkills(filterSkills);
        } else {
          setResponse2(res1.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Хүсэлт илгээгээгүй");
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);
  const handleForm = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const sendData = async () => {
    try {
      const res = await axios.post(`/api/skills/featured`, form);
      setResponse(res.data);
      if (res.data.success) {
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err, "Сервер дээр алдаа гарлаа!");
    }
  };
  return (
    <div className="border p-5 flex flex-col justify-center gap-4">
      {skills && (
        <div>
          {skills.length === 0 && (
            <div>
              Skill харагдахгүй байна уу?{" "}
              <Link href={`/account/settings/about`} className=" underline">
                Энд дарж
              </Link>{" "}
              skill нэмээрэй!
            </div>
          )}
          <select
            defaultValue={form?.skill}
            onChange={handleForm}
            name="skill"
            id="skill"
            className="border p-2 w-1/4"
          >
            {skills.map((skill) => (
              <option value={skill.id} key={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Textarea name="detail" onChange={handleForm} />
      <div>
        <Label htmlFor="startedAt">Эхлэсэн</Label>
        <Input
          id="startedAt"
          type="date"
          name="startedAt"
          // max={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const date = new Date(e.target.value);

            setForm((prev) => {
              return {
                ...prev,
                startedAt: date,
              };
            });
          }}
        />
      </div>
      <div className=" flex items-center gap-6">
        <div className="">
          <Label htmlFor="endedAt">Хүртэл</Label>
          <Input
            onChange={(e) => {
              const date = new Date(e.target.value);

              setForm((prev) => {
                return {
                  ...prev,
                  endedAt: date,
                };
              });
            }}
            id="endedAt"
            name="endedAt"
            type="date"
            disabled={form.present}
          />
        </div>
        <div className=" flex gap-2">
          <Switch
            onChange={(e) => {
              setForm((prev) => {
                return {
                  ...prev,
                  present: e.target.checked,
                };
              });
            }}
          />
          <Label>Одоог хүртэл ажиллаж байгаа</Label>
        </div>
      </div>
      <div>
        {response && (
          <div
            className={` ${
              response.success ? ` text-green-400` : ` text-red-400`
            } `}
          >
            {response.message}
          </div>
        )}
      </div>
      <Button disabled={!FormValid} onClick={sendData}>
        Нэмэх
      </Button>
      {/* <div className="border h-20 w-20 rounded-full flex justify-center items-center text-7xl font-thin">
        +
      </div> */}
    </div>
  );
};
