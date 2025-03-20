"use client"
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

  if (currentStep === 4) {
    return <StepFour
    setCurrentStep={setCurrentStep} />;
  }

  if (currentStep === 5) {
    return <StepFive
    setCurrentStep={setCurrentStep} />;
  }

  if (currentStep === 6) {
    return <StepSix
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

