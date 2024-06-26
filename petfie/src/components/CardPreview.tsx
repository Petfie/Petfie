import { forwardRef, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

const makeTags = (personality: { [key: string]: boolean }, step: number) => {
  if (!personality) return;
  const tagArray = Object.keys(personality).filter((key) => personality[key]);
  return tagArray.map((tag: any) => {
    return (
      <div
        key={tag}
        className={`border-[1px] border-white rounded-full whitespace-nowrap p-[0px_9px] flex justify-center items-center text-white ${
          step === 2 ? "text-[10px]" : "text-[8px]"
        }`}
      >
        {tag}
      </div>
    );
  });
};

interface CardPreviewProps {
  step: number;
  frameUrl: string;
  imgUrl: string;
  setImgUrl: (data: string) => void;
  info: {
    name: string;
    age: string;
    gender?: "수컷" | "암컷" | "비밀";
    additionalInfo: string;
    personality: { [key: string]: boolean };
  };
}

const genderMap = {
  수컷: "/asset/male-icon.svg",
  암컷: "/asset/female-icon.svg",
  비밀: "/asset/neuter-icon.svg",
};

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ step, imgUrl, setImgUrl, frameUrl, info }, ref) => {
    const { name, age, gender, additionalInfo, personality } = info;
    const genderIconSrc = gender && genderMap[gender];

    return (
      <>
        {
          <div
            className="relative w-full h-full rounded-lg card_preview"
            ref={ref}
          >
            {/* 유저가 업로드한 펫 이미지 */}
            {imgUrl && (
              <Image
                alt="카드 이미지"
                src={imgUrl}
                fill
                className="object-cover rounded-lg"
              />
            )}
            {/* 유저가 선택한 카드 프레임 이미지 */}
            {frameUrl && (
              <Image
                alt="카드 프레임"
                src={frameUrl}
                width={step === 2 ? 236 : 198}
                height={step === 2 ? 338 : 284}
                className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50"
                draggable="false"
              />
            )}
            {/* 1단계의 업로드 이미지 버튼 */}
            {step === 0 && <ImageUpload setImageData={setImgUrl} />}
            {/* 펫 이름 및 펫 정보 */}
            {
              <>
                {/* 펫 이름 */}
                {name && (
                  <div
                    className={`absolute ${step === 2 ? "top-[28px]" : "top-[22px]"} left-[50%] translate-x-[-50%] max-w-[70%] text-white bg-black/40 p-[2px_8px_2px_8px] rounded-3xl truncate text-ellipsis flex justify-center items-center ${
                      step === 2 ? "text-[21px]" : "text-[17px]"
                    }`}
                  >
                    {name}
                  </div>
                )}
                {/* 펫 정보 */}
                <div
                  className={`absolute bottom-6 left-0 right-0 mx-auto w-[83%] bg-black/50 text-white rounded-lg ${
                    step === 2
                      ? "min-h-[80px] text-xs"
                      : "min-h-[80px] text-[0.5rem]"
                  }`}
                >
                  <div className="w-full h-full p-[8px_11px] rounded-lg ">
                    <div className="flex flex-col w-full gap-1 pb-[5px] border-b border-neutral-300/80 ">
                      <div className="flex justify-between">
                        <div className="">
                          <span className={`mr-2 whitespace-nowrap text-neutral-200 
                      ${step === 2 ? "text-[10px]" : "text-[8px]"}`}>
                            나이
                          </span>
                          <span className={`${step === 2 ? "text-[10px]" : "text-[8px]"}`}>{age}</span>
                        </div>
                        <div className="min-w-[46px] flex relative">
                          <div className={`mr-2 whitespace-nowrap text-neutral-200 
                      ${step === 2 ? "text-[10px]" : "text-[8px]"}`}>
                            성별
                          </div>
                          {genderIconSrc && (
                            <Image
                              alt={gender || "아이콘"}
                              src={genderIconSrc}
                              width={step === 2 ? 11 : 7}
                              height={step === 2 ? 11 : 7}
                            />
                          )}
                        </div>
                      </div>
                      <div className={`${step === 2 ? "text-[10px]" : "text-[8px]"} flex items-center`}>
                        <span className={`${step === 2 ? "text-[10px]" : "text-[8px]"}`}>
                          {additionalInfo}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mt-[5px] min-h-[14px]">
                      <span className={`mr-2 whitespace-nowrap text-neutral-200 
                      ${step === 2 ? "text-[10px]" : "text-[8px]"}`}>
                        성격
                      </span>
                      <div className="grid grid-cols-3 gap-1 text-xs grow">
                        {makeTags(personality, step)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        }
      </>
    );
  }
);

CardPreview.displayName = "CardPreview";
