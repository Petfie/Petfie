"use client";

import { Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { StepDone } from "@/components/StepDone";
import { CardPreview } from "@/components/CardPreview";
import InfoForm from "@/components/InfoForm";
import { Info } from "@/components/InfoForm.types";
import Carousel from "@/features/Carousel";
import { toPng } from "html-to-image";

export default function Step() {
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

  // Info state
  const [info, setInfo] = useState<Info>({
    name: "",
    age: "",
    gender: "",
    additionalInfo: "",
    personality: {},
  });

  useEffect(() => {
    console.log("info", info);
  }, [info]);

  // 카드 미리보기 state
  const [imgUrl, setImgUrl] = useState("/asset/animal2.jpg");
  const [frameUrl, setFrameUrl] = useState("/asset/카드프레임1.svg");

  // DOM 캡처(이미지 저장) 위한 카드 div 선택
  const captureAreaRef = useRef<HTMLDivElement>(null);

  const saveAsImage = async () => {
    try {
      if (captureAreaRef.current) {
        const dataUrl = await toPng(captureAreaRef.current, {
          cacheBust: false,
        });

        const link = document.createElement("a");
        link.download = "petfie.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
              ref={captureAreaRef}
              step={step}
              imgUrl={imgUrl}
              frameUrl={frameUrl}
              info={info}
            />
          </div>
        }
      </div>
      {/* Main layout */}
      <div>
        {step === 0 && <Carousel changeFrame={setFrameUrl} />}
        {step === 1 && <InfoForm info={info} changeInfo={setInfo} />}
        {step === 2 && <StepDone saveAsImage={saveAsImage} />}
      </div>

      {/* Footer layout */}
      {step === 1 && <Button onClick={decreaseStep}>이전</Button>}
      {step !== 2 && <Button onClick={increaseStep}>다음</Button>}
      {step === 2 && (
        <>
          <Button onClick={goToFirstStep}>다른 카드 만들러 가기</Button>
        </>
      )}
    </>
  );
}
