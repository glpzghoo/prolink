"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import { skill } from "@prisma/client";
import { SelectContent } from "@radix-ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
type form = {
  about: string;
  skills: string[];
};

export default function App() {
  const [form, setForm] = useState<form>({
    about: "",
    skills: [],
  });
  const fakearray: string[] = [];
  const [loading, setLoading] = useState(false);
  console.log(form);
  return (
    <div className="min-h-screen -mt-15">
      <div className="min-h-screen flex items-center justify-center">
        <div className="">
          <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
            <div className="flex justify-center h-16 items-center border-b-2 font-bold">
              Өөрийнхөө талаар оруулна уу?
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
                    Миний тухай
                  </Label>
                  <Textarea
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
                    Ажил олгогчдод өөрийгөө танилцуулаарай!
                  </div>
                </div>
                <div>
                  <Select
                    onValueChange={(value) => {
                      form.skills.push(value);
                      console.log(form);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ур чадваруудаас сонгоно уу!" />
                    </SelectTrigger>
                    <SelectContent className=" fixed">
                      <SelectGroup className="bg-background">
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className={`w-full bg-[#108A00]
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
          </div>
        </div>
      </div>
    </div>
  );
}
