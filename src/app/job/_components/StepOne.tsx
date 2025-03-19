"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type StepOneProps = {
  setCurrentStep: (step: number) => void;
};

export function StepOne({ setCurrentStep }: StepOneProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Бид танд хэрхэн туслах вэ?
      </h1>
      <RadioGroup
        className="w-full max-w-md"
        onValueChange={setSelectedOption}
        value={selectedOption || ""}
      >
        <Card className="mb-4 cursor-pointer">
          <CardContent className="p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <RadioGroupItem value="long_term" />
              <span>
                <strong>Урт хугацааны төсөл</strong>
                <br />
                Долоо хоногт 30+ цаг, эсвэл 3 сараас дээш хугацаатай.
              </span>
            </label>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardContent className="p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <RadioGroupItem value="short_term" />
              <span>
                <strong>Богино хугацааны төсөл</strong>
                <br />
                Долоо хоногт 30-аас бага цаг, эсвэл 3 сараас бага хугацаатай.
              </span>
            </label>
          </CardContent>
        </Card>
      </RadioGroup>
      <div className="flex gap-4 mt-6">
        <Button variant="ghost">Цуцлах</Button>
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={!selectedOption}
          className={selectedOption ? "font-semibold bg-[#129b00] text-white hover:bg-[#129b00]/90" : ""}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
