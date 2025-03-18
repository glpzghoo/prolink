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
      </div>
    </div>
  );
}
