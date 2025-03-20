"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type JobTitleStepProps = {
  setCurrentStep: (step: number) => void;
};

export function StepSix({ setCurrentStep }: JobTitleStepProps) {
  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mt-2">Шаардаж байгаа чадваруудаа бичээрэй!</h1>
        <p className="text-gray-600 mt-2">
          Шаардлагатай байгаа зүйлсээ бичээрэй.
        </p>

        <div className="mt-2">
          <Input 
            type="text" 
            placeholder="Жишээ нь: React хөгжүүлэгч хайж байна"
            value={title}
            onChange={handleTitleChange}
            className="w-full h-50 text-left"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold">Жишээ шаардлагууд</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm mt-2">
            <li>Таны даалгавар эсвэл хүргэх ажлын талаар тодорхой мэдээлэл</li>
            <li>Ажлыг гүйцэтгэхэд шаардлагатай ур чадварууд</li>
            <li>Сайн харилцаа холбоо</li>
            <li>Та болон танай баг хэрхэн ажиллахыг хүсэж байгаагийн дэлгэрэнгүй мэдээлэл</li>
          </ul>
        </div>

        <div className="flex justify-between items-center mt-10">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>Буцах</Button>
          <Button 
            onClick={() => setCurrentStep(7)} 
            disabled={!title.trim()}
            className={`font-semibold px-6 transition-opacity ${!title.trim() ? "opacity-50 cursor-not-allowed" : "bg-[#129b00] text-white hover:bg-[#129b00]/90"}`}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
}
