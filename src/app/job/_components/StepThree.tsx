'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

type StepThreeProps = {
  setCurrentStep: (step: number) => void;
  setSelectedSkills: any;
  selectedSkills: string[];
};

export function StepThree({ setCurrentStep, setSelectedSkills, selectedSkills }: StepThreeProps) {
  // const skills = [
  // 	"График дизайн",
  // 	"Англи хэл",
  // 	"Adobe Photoshop",
  // 	"Веб дизайн",
  // 	"Контент бичих",
  // ];\

  const [skills, setSkills] = useState<any>();

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev: any) =>
      prev.includes(skill) ? prev.filter((s: any) => s !== skill) : [...prev, skill]
    );
  };

  const fetchSkills = async () => {
    let res;
    try {
      res = await axios.get(`/api/skills`);
      if (res.data.success) {
        setSkills(res.data.data.skills);
      }
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-3xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Таны ажилд шаардлагатай гол ур чадварууд юу вэ?
          </h2>
          <div className="mb-4">
            <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[40px] bg-white">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={() => toggleSkill(skill)}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <Input
                placeholder="Ур чадвар нэмэх"
                className="border-none focus:ring-0 p-0 flex-1"
                readOnly
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Шилдэг үр дүн авахын тулд 3-5 ур чадвар нэмээрэй
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills?.map((skill: any) => (
              <Button
                key={skill.id}
                variant="outline"
                className={`rounded-full transition-colors ${
                  selectedSkills.includes(skill.name) ? 'bg-green-500 text-white' : ''
                }`}
                onClick={() => toggleSkill(skill.name)}
              >
                {skill.name} +
              </Button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Буцах
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              disabled={selectedSkills.length === 0}
              className={`font-semibold px-6 transition-opacity ${
                selectedSkills.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-[#129b00] text-white hover:bg-[#129b00]/90'
              }`}
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
