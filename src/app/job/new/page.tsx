"use client";
import { useEffect, useState } from "react";
import { StepOne } from "../_components/StepOne";
import { StepTwo } from "../_components/StepTwo";
import { StepThree } from "../_components/StepThree";
import { StepFour } from "../_components/StepFour";
import { StepFive } from "../_components/StepFive";
import { StepSix } from "../_components/StepSix";

type PostProps = {
	currentStep: number;
	setCurrentStep: (step: number) => void;
};

const Post = ({ currentStep, setCurrentStep }: PostProps) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("");
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

	const [scope, setScope] = useState<string>("large");
	const [duration, setDuration] = useState<string>("3-6 months");
	const [experience, setExperience] = useState<string>("intermediate");
	const [salaryRate, setSalaryRate] = useState<string>("HOUR");
	const [fullTime, setFullTime] = useState<string>("yes");

	const [budgetType, setBudgetType] = useState("hourly");
	const [hourlyRate, setHourlyRate] = useState({ from: 10, to: 25 });
	const [salary, setSalary] = useState(0);

	const [requirements, setRequirements] = useState<string>("");
	if (currentStep === 1) {
		return (
			<StepOne
				setSelectedOption={setSelectedOption}
				selectedOption={selectedOption}
				setCurrentStep={setCurrentStep}
			/>
		);
	}

	if (currentStep === 2) {
		return (
			<StepTwo
				setTitle={setTitle}
				title={title}
				setCurrentStep={setCurrentStep}
			/>
		);
	}

	if (currentStep === 3) {
		return (
			<StepThree
				selectedSkills={selectedSkills}
				setSelectedSkills={setSelectedSkills}
				setCurrentStep={setCurrentStep}
			/>
		);
	}

	if (currentStep === 4) {
		return (
			<StepFour
				setScope={setScope}
				scope={scope}
				duration={duration}
				setDuration={setDuration}
				experience={experience}
				setExperience={setExperience}
				fullTime={fullTime}
				setFullTime={setFullTime}
				setCurrentStep={setCurrentStep}
			/>
		);
	}

	if (currentStep === 5) {
		return (
			<StepFive
				budgetType={budgetType}
				setBudgetType={setBudgetType}
				hourlyRate={hourlyRate}
				setHourlyRate={setHourlyRate}
				salary={salary}
				setSalary={setSalary}
				setCurrentStep={setCurrentStep}
				setSalaryRate={setSalaryRate}
				salaryRate={salaryRate}
			/>
		);
	}

	if (currentStep === 6) {
		return (
			<StepSix
				setRequirements={setRequirements}
				setCurrentStep={setCurrentStep}
				requirements={requirements}
				selectedOption={selectedOption}
				title={title}
				selectedSkills={selectedSkills}
				scope={scope}
				duration={duration}
				experience={experience}
				fullTime={fullTime}
				salary={salary}
				salaryRate={salaryRate}
			/>
		);
	}

	return <div> Success </div>;
};

export default function NewJob() {
	const [currentStep, setCurrentStep] = useState(1);

	return (
		<div>
			<Post currentStep={currentStep} setCurrentStep={setCurrentStep} />
		</div>
	);
}
