"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type StepFourProps = {
	setCurrentStep: (step: number) => void;
	setScope: any;
	scope: string;
	duration: string;
	setDuration: any;
	experience: string;
	setExperience: any;
	fullTime: string;
	setFullTime: any;
};

export function StepFour({
	setCurrentStep,
	setScope,
	scope,
	duration,
	setDuration,
	experience,
	setExperience,
	fullTime,
	setFullTime,
}: StepFourProps) {
	const isNextDisabled = !scope || !duration || !experience || !fullTime;

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h2 className="text-2xl font-semibold">
				Туршлагын түвшнийг тодорхойлно уу
			</h2>
			<p className="text-gray-600 mb-4">
				Энэ нь эцсийн үр дүн биш бөгөөд таны хэрэгцээнд тохирох зөв хүнийг
				олоход тусална.
			</p>

			<Card className="mb-6">
				<CardContent className="p-4 space-y-3">
					<h3 className="font-medium">Туршлагын түвшин</h3>
					<RadioGroup value={experience} onValueChange={setExperience}>
						<Label htmlFor="entry" className="flex items-center space-x-2">
							<RadioGroupItem id="entry" value="entry" /> <span>Анхан шат</span>
						</Label>
						<Label
							htmlFor="intermediate"
							className="flex items-center space-x-2"
						>
							<RadioGroupItem id="intermediate" value="intermediate" />{" "}
							<span>Дунд шат</span>
						</Label>
						<Label htmlFor="expert" className="flex items-center space-x-2">
							<RadioGroupItem id="expert" value="expert" />{" "}
							<span>Ахисан түвшин</span>
						</Label>
					</RadioGroup>
				</CardContent>
			</Card>

			<div className="flex justify-between">
				<Button variant="outline" onClick={() => setCurrentStep(3)}>
					Буцах
				</Button>
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
