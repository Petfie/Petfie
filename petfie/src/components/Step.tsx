"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { StepDone } from "@/components/StepDone";

export default function Step0() {
  // step state
  const [step, setStep] = useState(0);

  const increaseStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const decreaseStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const goToFirstStep = () => {
    setStep(0);
  };

  return (
    <>
      {/* Main layout */}
      <div>
        {step === 0 && <div>step 0 템플릿 선택 / 사진 업로드</div>}
        {step === 1 && <div>step 1 커스텀 하기 / 완성하기</div>}
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
