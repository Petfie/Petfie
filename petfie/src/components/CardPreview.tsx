import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

const makeTags = (personality: { [key: string]: boolean }, step: number) => {
  if (!personality) return;
  const tagArray = Object.keys(personality).filter((key) => personality[key]);
  return tagArray.map((tag: any) => {
    return (
      <div
        key={tag}
        className={`min-h-[14px] border-[1px] border-white rounded-xl text-white px-0  flex justify-center items-center truncate ${
          step === 2 ? "text-xs py-[0.1rem]" : "text-[0.4rem]"
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

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", updateMousePosition);

      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    const cardStyle = {
      transform: `rotateX(${
        (mousePosition.y - window.innerHeight / 2) / 20
      }deg) rotateY(${(mousePosition.x - window.innerWidth / 2) / 20}deg)`,
    };

    return (
      <>
        {
          <div
            className={`relative bg-gray-300 w-full h-full rounded-lg 
              ${step === 2 && "transform-gpu"}
            `}
            ref={ref}
            style={step === 2 ? cardStyle : {}}
          >
            {/* 유저가 업로드한 펫 이미지 */}
            {imgUrl && (
              <Image
                alt="카드 이미지"
                src={imgUrl}
                fill
                // className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
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
                className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
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
                    className={`absolute top-[10%] left-[50%] translate-x-[-50%] max-w-[70%] text-white bg-black/40 backdrop-blur-sm p-2 rounded-3xl truncate text-ellipsis flex justify-center items-center ${
                      step === 2 ? "text-lg" : "text-[0.8rem]"
                    }`}
                  >
                    {name}
                  </div>
                )}
                {/* 펫 정보 */}
                <div
                  className={`flex flex-col items-center justify-center absolute bottom-[10px] left-[50%] translate-x-[-50%] w-[90%] bg-black/40 text-white rounded-lg backdrop-blur-sm ${
                    step === 2
                      ? "min-h-[124px] text-xs"
                      : "min-h-[80px] text-[0.5rem]"
                  }`}
                >
                  <div className="w-full h-full p-2 px-4 rounded-lg ">
                    <div className="w-full  border-b-2 flex flex-col gap-1 pb-2 ">
                      <div className="flex justify-between">
                        <div className="">
                          <span className="mr-4">나이</span>
                          {age}
                        </div>
                        <div className="mr-1 min-w-[50px] flex relative">
                          <span className="mr-4">성별</span>
                          {genderIconSrc && (
                            <Image
                              alt={gender || "아이콘"}
                              src={genderIconSrc}
                              width={step === 2 ? 11 : 7}
                              height={step === 2 ? 11 : 7}
                              className="relative bottom-[1px]"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <span className="mr-4 min-w-5">소개</span>
                        <p>{additionalInfo}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mt-2 min-h-[14px]">
                      <span className="mr-4 truncate">성격</span>
                      <div className="grow grid grid-cols-3 gap-1 text-xs">
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
