"use client"
import { useEffect, useState } from "react";
import { StepOne } from "../_components/StepOne";
import { StepTwo } from "../_components/StepTwo";
import { StepThree } from "../_components/StepThree";

type PostProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const Post = ({ currentStep, setCurrentStep }: PostProps) => {
  if (currentStep === 1) {
    return <StepOne setCurrentStep={setCurrentStep} />;
  }
  
  if (currentStep === 2) {
    return <StepTwo 
    setCurrentStep={setCurrentStep} />;
  }

  if (currentStep === 3) {
    return <StepThree
    setCurrentStep={setCurrentStep} />;
  }

  return <div> Success </div>
};

export default function NewJob() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <Post currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  )
}

