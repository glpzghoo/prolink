"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LuClock5, LuCircleDollarSign } from "react-icons/lu";

type StepFiveProps = {
    setCurrentStep: (step: number) => void;
};

export function StepFive({ setCurrentStep }: StepFiveProps) {
  const [budgetType, setBudgetType] = useState("hourly");
  const [hourlyRate, setHourlyRate] = useState({ from: 10, to: 25 });
  const [fixedPrice, setFixedPrice] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Таны төсөв ямар байх вэ?</h2>
      <p className="text-gray-600">
        Энэ нь таны боломжит авьяастнуудтай нийцэх төслүүдийг тохируулахад тусална.
      </p>
      <RadioGroup value={budgetType} onValueChange={setBudgetType} className="flex gap-6">
        <Card 
          onClick={() => setBudgetType("hourly")}
          className={`w-72 cursor-pointer border-2 ${budgetType === "hourly" ? "border-green-500" : "border-gray-200"}`}
        >
          <CardContent>
            <div className="flex items-center justify-between">
                <LuClock5 className="w-[25px] h-[25px]" />
                <Label>
                    <RadioGroupItem value="hourly" className="border-gray-300 text-green-600 font-bold w-[25px] h-[25px]" />
                </Label>
            </div>
            <span className="font-semibold">Цагийн хөлс</span>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setBudgetType("fixed")}
          className={`w-72 cursor-pointer border-2 ${budgetType === "fixed" ? "border-green-500" : "border-gray-200"}`}
        >
          <CardContent className="p-4 gap-3">
            <Label className="flex items-center justify-between gap-2 cursor-pointer">
              <LuCircleDollarSign className="w-[25px] h-[25px]" />
              <RadioGroupItem value="fixed" className="border-gray-300 text-green-600 w-[25px] h-[25px]" />
            </Label>
            <span className="font-semibold">Тогтмол үнэ</span>
          </CardContent>
        </Card>

      </RadioGroup>

      {/* Budget Selection */}
      {budgetType === "hourly" ? (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Цагийн хөлс</h3>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={hourlyRate.from}
                onChange={(e) => setHourlyRate({ ...hourlyRate, from: Number(e.target.value) })}
                className="border p-2 rounded-md w-24"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={hourlyRate.to}
                onChange={(e) => setHourlyRate({ ...hourlyRate, to: Number(e.target.value) })}
                className="border p-2 rounded-md w-24"
              />
              <span className="mt-2">/цаг</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Төслийн нийт өртөг</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(Number(e.target.value))}
                className="border p-2 rounded-md w-32"
              />
              <span>₮</span>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(4)}>Буцах</Button>
        <Button onClick={() => setCurrentStep(6)} className="bg-green-600 text-white hover:bg-black">Үргэлжлүүлэх</Button>
      </div>
    </div>
  );
}
