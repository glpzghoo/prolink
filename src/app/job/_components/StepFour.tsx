"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type StepFourProps = {
    setCurrentStep: (step: number) => void;
};

export function StepFour({ setCurrentStep }: StepFourProps) {
  
  const [scope, setScope] = useState<string>("large");
  const [duration, setDuration] = useState<string>("3-6 months");
  const [experience, setExperience] = useState<string>("intermediate");
  const [fullTime, setFullTime] = useState<string>("yes");

  const isNextDisabled = !scope || !duration || !experience || !fullTime;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Дараах ажлын хүрээг тооцоолно уу.</h2>
      <p className="text-gray-600 mb-4">
        Эдгээр нь эцсийн үр дүн биш бөгөөд таны хэрэгцээнд тохирох зөв хүнийг олоход тусална.
      </p>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Ажлын цар хүрээ</h3>
          <RadioGroup value={scope} onValueChange={setScope}>
            <Label htmlFor="large" className="flex items-center space-x-2">
              <RadioGroupItem id="large" value="large" /> <span>Том (Бүтэн вэбсайт хөгжүүлэх)</span>
            </Label>
            <Label htmlFor="medium" className="flex items-center space-x-2">
              <RadioGroupItem id="medium" value="medium" /> <span>Дунд (Ландинг хуудас хийх)</span>
            </Label>
            <Label htmlFor="small" className="flex items-center space-x-2">
              <RadioGroupItem id="small" value="small" /> <span>Жижиг (Контент шинэчлэх)</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Ажил хэр удаан үргэлжлэх вэ?</h3>
          <RadioGroup value={duration} onValueChange={setDuration}>
            <Label htmlFor="more-than-6" className="flex items-center space-x-2">
              <RadioGroupItem id="more-than-6" value="more than 6 months" /> <span>6 сараас дээш</span>
            </Label>
            <Label htmlFor="3-6" className="flex items-center space-x-2">
              <RadioGroupItem id="3-6" value="3-6 months" /> <span>3-6 сар</span>
            </Label>
            <Label htmlFor="1-3" className="flex items-center space-x-2">
              <RadioGroupItem id="1-3" value="1-3 months" /> <span>1-3 сар</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Туршлагын түвшин</h3>
          <RadioGroup value={experience} onValueChange={setExperience}>
            <Label htmlFor="entry" className="flex items-center space-x-2">
              <RadioGroupItem id="entry" value="entry" /> <span>Анхан шат</span>
            </Label>
            <Label htmlFor="intermediate" className="flex items-center space-x-2">
              <RadioGroupItem id="intermediate" value="intermediate" /> <span>Дунд шат</span>
            </Label>
            <Label htmlFor="expert" className="flex items-center space-x-2">
              <RadioGroupItem id="expert" value="expert" /> <span>Ахисан түвшин</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium">Энэ ажил бүтэн цагийнх болох боломжтой юу?</h3>
          <RadioGroup value={fullTime} onValueChange={setFullTime}>
            <Label htmlFor="yes" className="flex items-center space-x-2">
              <RadioGroupItem id="yes" value="yes" /> <span>Тийм, бүтэн цагийн ажил болж болно</span>
            </Label>
            <Label htmlFor="no" className="flex items-center space-x-2">
              <RadioGroupItem id="no" value="no" /> <span>Үгүй, одоогоор үгүй</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>Буцах</Button>
        <Button 
          onClick={() => setCurrentStep(5)} 
          disabled={isNextDisabled}
          className={`font-semibold ${
            isNextDisabled 
              ? "bg-gray-400 text-white cursor-not-allowed" 
              : "bg-[#129b00] text-white hover:bg-[#129b00]/90"
          }`}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
