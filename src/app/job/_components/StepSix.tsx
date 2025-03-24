"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

type JobRequirementsStepProps = {
	setCurrentStep: (step: number) => void;
	setRequirements: any;
	requirements: string;
	selectedOption: string | null;
	title: string;
	selectedSkills: string[];
	scope: string;
	duration: string;
	experience: string;
	fullTime: string;
	salary: any;
	salaryRate: any;
};

export function StepSix({
	setCurrentStep,
	setRequirements,
	requirements,
	selectedOption,
	title,
	selectedSkills,
	scope,
	duration,
	experience,
	fullTime,
	salary,
	salaryRate,
}: JobRequirementsStepProps) {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState<any>();
	const handlerequirementsChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setRequirements(e.target.value);
	};
	let exp: boolean = true;
	if (experience == "entry") exp = false;
	const sendData = async (
		requirements: string,
		selectedOption: string | null,
		title: string,
		selectedSkills: string[],
		scope: string,
		duration: string,
		fullTime: string,
		salary: any,
		salaryRate: any
	) => {
		setLoading(true);

		try {
			const res = await axios.post(`/api/job/create`, {
				requirements,
				selectedOption,
				title,
				selectedSkills,
				scope,
				duration,
				exp,
				fullTime,
				salary,
				salaryRate,
			});
			setResponse(res.data);
			setCurrentStep(7);
		} catch (err) {
			console.error(err, "server error");
			setResponse({
				message: "Сервертэй холбогдож чадсангүй!",
				success: false,
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
			<div className="max-w-2xl w-full">
				<h1 className="text-3xl font-bold mt-2">
					Шаардаж байгаа чадваруудаа бичээрэй!
				</h1>
				<p className="text-gray-600 mt-2">
					Шаардлагатай байгаа зүйлсээ бичээрэй.
				</p>

				<div className="mt-2">
					<Textarea
						rows={100}
						placeholder="Жишээ нь: React хөгжүүлэгч хайж байна"
						value={requirements}
						onChange={handlerequirementsChange}
						className="w-full h-50 text-left"
					/>
				</div>

				<div className="mt-6">
					<h3 className="text-md font-semibold">Жишээ шаардлагууд</h3>
					<ul className="list-disc pl-5 text-gray-600 text-sm mt-2">
						<li>Таны даалгавар эсвэл хүргэх ажлын талаар тодорхой мэдээлэл</li>
						<li>Ажлыг гүйцэтгэхэд шаардлагатай ур чадварууд</li>
						<li>Сайн харилцаа холбоо</li>
						<li>
							Та болон танай баг хэрхэн ажиллахыг хүсэж байгаагийн дэлгэрэнгүй
							мэдээлэл
						</li>
					</ul>
				</div>

				<div className="flex justify-between items-center mt-10">
					<Button variant="outline" onClick={() => setCurrentStep(5)}>
						Буцах
					</Button>
					<Button
						onClick={() =>
							sendData(
								requirements,
								selectedOption,
								title,
								selectedSkills,
								scope,
								duration,
								fullTime,
								salary,
								salaryRate
							)
						}
						disabled={!requirements.trim() || loading}
						className={`font-semibold px-6 transition-opacity ${
							!requirements.trim() || loading
								? "opacity-50 cursor-not-allowed"
								: "bg-[#129b00] text-white hover:bg-[#129b00]/90"
						}`}
					>
						{loading ? "Ачаалж байна..." : "Нийтлэх"}
					</Button>
				</div>
			</div>
		</div>
	);
}
