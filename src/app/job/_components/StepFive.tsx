"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LuClock5, LuCircleDollarSign } from "react-icons/lu";

type StepFiveProps = {
  setCurrentStep: (step: number) => void;
  budgetType: any;
  setBudgetType: any;
  hourlyRate: any;
  setHourlyRate: any;
  salary: any;
  setSalary: any;
  setSalaryRate: any;
  salaryRate: string;
};

export function StepFive({
  setCurrentStep,
  salary,
  setSalary,
  setSalaryRate,
  salaryRate,
}: StepFiveProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Таны төсөв ямар байх вэ?</h2>
      <p className="text-gray-600">
        Энэ нь таны боломжит авьяастнуудтай нийцэх төслүүдийг тохируулахад
        тусална.
      </p>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Цалингийн төрлөө сонгоно уу</h3>
          <RadioGroup value={salaryRate} onValueChange={setSalaryRate}>
            <Label htmlFor="hour" className="flex items-center space-x-2">
              <RadioGroupItem id="hour" value="HOUR" /> <span>Цагаар</span>
            </Label>
            <Label htmlFor="day" className="flex items-center space-x-2">
              <RadioGroupItem id="day" value="DAY" /> <span>Өдрөөр</span>
            </Label>
            <Label htmlFor="month" className="flex items-center space-x-2">
              <RadioGroupItem id="month" value="MONTH" /> <span>Сараар</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Цалин</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              onChange={(e) => setSalary(Number(e.target.value))}
              className="border p-2 rounded-md w-32"
            />
            <span>₮</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(4)}>
          Буцах
        </Button>
        <Button
          onClick={() => setCurrentStep(6)}
          className="bg-green-600 text-white hover:bg-black"
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
