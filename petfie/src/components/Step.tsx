"use client";

import { Button } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { StepDone } from "@/components/StepDone";
import { CardPreview } from "@/components/CardPreview";

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

  // Info Form State
  interface Info {
    name: string;
    age: string;
    gender: string;
    additionalInfo: string;
    personality: {
      [key: string]: boolean;
    };
  }
  const [info, setInfo] = useState<Info>({
    name: "댕댕이",
    age: "13",
    gender: "여성",
    additionalInfo: "instagram...",
    personality: {},
  });

  // 카드 미리보기 state
  const [imgUrl, setImgUrl] = useState("/asset/animal2.jpg");
  const [frameUrl, setFrameUrl] = useState("/asset/frame6.png");
  const [userInput, setUserInput] = useState({
    age: 13,
    gender: "0",
    name: "댕댕이",
    info: "instagram...",
    characters: ["온순함", "잠꾸러기", "조용한", "사나움", "귀염둥이"],
  });

  return (
    <>
      {/* Main layout */}
      <div>
        {step === 0 && <div>step 0 템플릿 선택 / 사진 업로드</div>}
        {step === 1 && <div>step 1 커스텀 하기 / 완성하기</div>}
        {step === 2 && <div> 완성된 야호 카드</div>}
      </div>
      {/* Card Preview */}
      <div
        className={`w-full flex justify-center items-center min-h-[310px] rounded-lg ${
          step !== 2 && "bg-black"
        }`}
      >
        {
          <div
            className={
              step === 2 ? "w-[316px] h-[454px]" : "w-[198px] h-[284px]"
            }
          >
            <CardPreview
              step={step}
              imgUrl={imgUrl}
              frameUrl={frameUrl}
              userInput={userInput}
            />
          </div>
        }
      </div>

      {/* Footer layout */}
      {step === 1 && <Button onClick={decreaseStep}>이전</Button>}
      {step !== 2 && <Button onClick={increaseStep}>다음</Button>}
      {step === 2 && (
        <>
          <StepDone />
          <Button onClick={goToFirstStep}>다른 카드 만들러 가기</Button>
        </>
      )}
    </>
  );
}
