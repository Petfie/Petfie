"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { StepDone } from "@/components/StepDone";
import InfoForm from "./InfoForm";

export default function Step0() {
  // step state
  const [step, setStep] = useState(1);

  const increaseStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const decreaseStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const goToFirstStep = () => {
    setStep(0);
  };

  // Info Form State
  export interface Info {
    name: string;
    age: string;
    gender: string;
    additionalInfo: string;
    personality: {
      [key: string]: boolean;
    };
  }
  const [info, setInfo] = useState<Info>({
    name: "",
    age: "",
    gender: "",
    additionalInfo: "",
    personality: {},
  });

  return (
    <>
      {/* Main layout */}
      <div>
        {step === 0 && <div>step 0 템플릿 선택 / 사진 업로드</div>}
        {step === 1 && <InfoForm info={info} changeInfo={setInfo} />}
        {step === 2 && <StepDone />}
      </div>
      {/* Footer layout */}
      {step === 1 && <Button onClick={decreaseStep}>이전</Button>}
      {step !== 2 && <Button onClick={increaseStep}>다음</Button>}
      {step === 2 && (
        <Button onClick={goToFirstStep}>다른 카드 만들러 가기</Button>
      )}
    </>
  );
}
