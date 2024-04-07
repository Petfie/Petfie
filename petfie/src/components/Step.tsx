"use client";

import { useEffect, useRef, useState } from "react";
import { StepDone } from "@/components/StepDone";
import { CardPreview } from "@/components/CardPreview";
import InfoForm from "@/components/InfoForm";
import { Info } from "@/components/InfoForm.types";
import Carousel from "@/features/Carousel";
import { toPng } from "html-to-image";
import StepProgress from "@/components/StepProgress";

export default function Step() {
  // step list
  const stepList = ["프레임 선택", "정보 입력", "완성"];
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
      {/* Step Progress */}
      <StepProgress currentStep={step} stepList={stepList} />
      {/* Card Preview */}
      <h1 className="my-2">{step === 2 ? "완성된 카드" : "카드 미리보기"}</h1>
      <div
        className={`w-full flex justify-center items-center min-h-[310px] rounded-lg mb-6`}
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
        {step === 0 && (
          <div>
            <h1 className="my-2">프레임 고르기</h1>
            <Carousel changeFrame={setFrameUrl} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h1 className="my-2">정보 입력하기</h1>
            <InfoForm info={info} changeInfo={setInfo} />
          </div>
        )}
        {step === 2 && <StepDone saveAsImage={saveAsImage} />}
      </div>

      {/* Footer layout */}
      <div className="button-cont">
        {step === 0 && (
          <>
            <button onClick={increaseStep} className="button-next">
              다음 단계
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <button onClick={decreaseStep} className="button-prev">
              이전 단계
            </button>
            <button onClick={increaseStep} className="button-next">
              다음 단계
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <button onClick={goToFirstStep} className="button-border">
              다른 카드 만들러 가기
            </button>
          </>
        )}
      </div>
    </>
  );
}
