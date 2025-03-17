"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MdAccessTime } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";

export default function Client() {
  return (
    <div>
      <Card className="px-4 w-[60%] rounded-sm text-sm">
        <div className="">
          <CardTitle>Гарчиг</CardTitle>
          <Input className="w-[30%] mt-3" />
        </div>
        <div className="">
          <CardTitle>Дэлгэрэнгүй</CardTitle>
          <Input className="w-[50%] h-[200px] mt-2" />
        </div>
        <div>
          <CardTitle>Категори</CardTitle>
          <Select>
            <SelectTrigger className="w-50 mt-3">
              <SelectValue placeholder="Категорио сонгоорой!" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Design">Web Design</SelectItem>
              <SelectItem value="UX/UI">UX/UI</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Web Development Consultation">
                Web Development Consultation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <CardTitle>Ур чадварууд</CardTitle>
          <Select>
            <SelectTrigger className="w-.? mt-3">
              <SelectValue placeholder="Ур чадваруудаа сонгоорой!" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Design">Graphic Design</SelectItem>
              <SelectItem value="UX/UI">UX/UI</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Web Development Consultation">
                Web Development Consultation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <CardTitle className="mb-3">Шаардлагууд</CardTitle>
          <Card className="px-4">
            <CardTitle>Шаардаж байгаа ур чадварууд</CardTitle>
            <Select>
              <SelectTrigger className="">
                <SelectValue
                  className="text-xs"
                  placeholder="Ур чадваруудаа сонгоорой!"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Design">Graphic Design</SelectItem>
                <SelectItem value="UX/UI">UX/UI</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Web Development Consultation">
                  Web Development Consultation
                </SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>
        <div>
          <CardTitle className="">Цалин</CardTitle>
          <div className="flex gap-10">
            <div className="p-3 w-50 h-20 border-gray-300 rounded-sm mt-3 border-1 hover:border-2 hover:border-black">
              <div className="flex justify-between items-center mb-3">
                <MdAccessTime className="w-[20px] h-[20px]" />
                <Checkbox className="w-[20px] h-[20px] rounded-full" />
              </div>
              <p className="font-semibold">Цагийн цалин</p>
            </div>
            <div className="p-3 w-50 h-20 border-gray-300 rounded-sm mt-3 border-1 hover:border-2 hover:border-black">
              <div className="flex justify-between items-center mb-3">
                <LuCircleDollarSign className="w-[20px] h-[20px]" />
                <Checkbox className="w-[20px] h-[20px] rounded-full" />
              </div>
              <p className="font-semibold">Сарын цалин</p>
            </div>
          </div>
          <div className="flex gap-10 mt-7">
            <div>
              <p>From</p>
              <div className="flex items-center gap-2">
                <Input className="w-20" /> /цагаар
              </div>
            </div>
            <div>
              <p>To</p>
              <div className="flex items-center gap-2">
                <Input className="w-20" /> /цагаар
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </Card>
    </div>
  );
}
