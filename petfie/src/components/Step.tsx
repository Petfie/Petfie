"use client";

import { useRef, useState } from "react";
import { StepDone } from "@/components/StepDone";
import { CardPreview } from "@/components/CardPreview";
import InfoForm from "@/components/InfoForm";
import { Info } from "@/components/InfoForm.types";
import Carousel from "@/features/Carousel";
import StepProgress from "@/components/StepProgress";
import "./step.css";
import { downloadImage, toPng } from "./htmlToImage";
import { useMobileScreen } from "@/hooks/useMobileScreen";

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
    resetCardState();
  };

  const resetCardState = () => {
    setInfo({
      name: "",
      age: "",
      additionalInfo: "",
      personality: {},
    });
    setImgUrl("");
    setFrameUrl("");
  };

  // Info state
  const [info, setInfo] = useState<Info>({
    name: "",
    age: "",
    additionalInfo: "",
    personality: {},
  });

  // form
  const infoFormRef = useRef<HTMLFormElement>(null);
  const submitForm = () => {
    // 유효성이 통과되면 다음 단계로 이동
    if (infoFormRef.current?.checkValidity()) {
      increaseStep();
    }
  };

  // 카드 미리보기 state
  const [imgUrl, setImgUrl] = useState("");
  const [frameUrl, setFrameUrl] = useState("/asset/카드프레임1.svg");

  const isMobile = useMobileScreen();

  // DOM 캡처(이미지 저장) 위한 카드 div 선택
  const captureAreaRef = useRef<HTMLDivElement>(null);

  const saveAsImage = async () => {
    if (captureAreaRef.current === null) return;

    const dataUrl = await toPng(captureAreaRef.current);

    if (!isMobile && typeof window !== "undefined") {
      ///url -> file 변경
      let arr: string[] = dataUrl.split(","),
        //  @ts-ignore
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const file = new File([u8arr], "petfie.png", { type: mime });

      const shareData = {
        title: "제목",
        files: [file],
        url: document.location.origin,
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        alert("공유하기가 지원되지 않는 환경 입니다.");
      }
    } else {
      downloadImage(dataUrl);
    }
  };

  return (
    <>
      {/* Step Progress */}
      <StepProgress currentStep={step} stepList={stepList} />
      {/* Card Preview */}
      <h1 className="my-2">{step === 2 ? "완성된 카드" : "카드 미리보기"}</h1>
      <div
        className={`preview_cont w-full flex justify-center items-center rounded-lg mb-6`}
      >
        {
          <div
            className={
              step === 2 ? "w-[236px] h-[338px]" : "w-[198px] h-[284px]"
            }
          >
            <CardPreview
              ref={captureAreaRef}
              step={step}
              frameUrl={frameUrl}
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
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
            <InfoForm ref={infoFormRef} info={info} changeInfo={setInfo} />
          </div>
        )}
        {step === 2 && <StepDone saveAsImage={saveAsImage} />}
      </div>

      {/* Footer layout */}
      <div className="button-cont">
        {step === 0 && (
          <>
            <button
              onClick={increaseStep}
              className={
                imgUrl ? "button-next" : "button-prev pointer-events-none"
              }
            >
              다음 단계
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <button onClick={decreaseStep} className="button-prev">
              이전 단계
            </button>
            <button
              type="submit"
              form="info-form"
              onClick={submitForm}
              className="button-next"
            >
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
