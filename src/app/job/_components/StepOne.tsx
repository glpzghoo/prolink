<<<<<<< HEAD
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Briefcase } from "lucide-react";

export default function StepOne() {
  const [selected, setSelected] = useState("short");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Бид танд хэрхэн туслах вэ?</h1>
      <RadioGroup value={selected} onValueChange={setSelected} className="space-y-4">
        <Card className={`p-4 flex items-center gap-4 border ${selected === "long" ? "border-green-500" : ""}`}>
          <RadioGroupItem id="long" value="long" />
          <Briefcase className="w-6 h-6" />
          <div>
            <Label htmlFor="long" className="font-medium">Урт хугацааны төсөл</Label>
            <p className="text-sm text-gray-600">Долоо хоногт 30+ цаг, 3 сараас дээш үргэлжлэх.</p>
          </div>
        </Card>

        <Card className={`p-4 flex items-center gap-4 border ${selected === "short" ? "border-green-500" : ""}`}>
          <RadioGroupItem id="short" value="short" />
          <CheckCircle className="w-6 h-6" />
          <div>
            <Label htmlFor="short" className="font-medium">Богино хугацааны төсөл</Label>
            <p className="text-sm text-gray-600">Долоо хоногт 30-аас бага цаг, 3 сараас бага үргэлжлэх.</p>
          </div>
        </Card>
      </RadioGroup>

      <div className="mt-6 space-x-4 flex justify-between">
        <Button variant="ghost" className="text-green-600">Цуцлах</Button>
        <Button className="bg-green-600 text-white">Үргэлжлүүлэх</Button>
=======
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
      <h1 className="text-3xl font-bold text-center mb-6">
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
>>>>>>> 20120af55ad2746e542b2f5aad245d3eeed1e48f
      </div>
    </div>
  );
}
