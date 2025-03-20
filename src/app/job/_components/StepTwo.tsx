"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type JobTitleStepProps = {
  setCurrentStep: (step: number) => void;
};

export function StepTwo({ setCurrentStep }: JobTitleStepProps) {
  const [title, setTitle] = useState<string>("");

  // Гарчгийн өөрчлөлтийг хянах функц
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-2xl w-full">
        {/* Алхамын мэдээлэл */}
        <h4 className="text-sm font-medium text-gray-500">1/5 Ажлын зар</h4>
        <h1 className="text-3xl font-bold mt-2">Сонирхолтой гарчигтай эхлээрэй.</h1>
        <p className="text-gray-600 mt-2">
          Танай ажлын зар зөв хүнээ олоход туслах болно. Энэ бол хамгийн түрүүнд харагдах зүйл тул сайн гарчиг сонгоорой!
        </p>

        {/* Гарчиг оруулах хэсэг */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ажлын зарын гарчиг бичнэ үү
          </label>
          <Input 
            type="text" 
            placeholder="Жишээ нь: React хөгжүүлэгч хайж байна"
            value={title}
            onChange={handleTitleChange}
            className="w-full"
          />
        </div>

        {/* Жишээ гарчигууд */}
        <div className="mt-6">
          <h3 className="text-md font-semibold">Жишээ гарчигууд</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm mt-2">
            <li>Номын захиалга/төлбөрийн системтэй WordPress сайт хийх</li>
            <li>Олон төрлийн сурталчилгаанд зориулсан график дизайнер хайж байна</li>
            <li>Бүтээгдэхүүний нээлтэнд зориулсан Facebook зарын мэргэжилтэн</li>
          </ul>
        </div>

        {/* Үйлдлийн товчнууд */}
        <div className="flex justify-between items-center mt-10">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>Буцах</Button>
          <Button 
            onClick={() => setCurrentStep(3)} 
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
