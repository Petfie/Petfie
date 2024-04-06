import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";

const makeTags = (tagArray: any, step: any) => {
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
  imgUrl: string;
  frameUrl: string;
  userInput: any;
}

export const CardPreview = ({
  step,
  imgUrl,
  frameUrl,
  userInput,
}: CardPreviewProps) => {
  const { name, age, gender, info, characters } = userInput;

  return (
    <>
      {
        <div className="relative bg-gray-300 w-full h-full rounded-lg">
          {/* 유저가 업로드한 펫 이미지 */}
          <Image
            alt="카드 이미지"
            src={imgUrl}
            fill
            // className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
            className="object-cover rounded-lg"
          />
          {/* 유저가 선택한 카드 프레임 이미지 */}
          <Image
            alt="카드 프레임"
            src={frameUrl}
            width={step === 2 ? 316 : 198}
            height={step === 2 ? 454 : 284}
            className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
            draggable="false"
          />
          {/* 1단계의 업로드 이미지 버튼 */}
          {step === 0 && (
            <div className="absolute w-full flex justify-center top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <Button color="gray" variant="classic" highContrast>
                <UploadIcon />
                <span>Image Upload</span>
              </Button>
            </div>
          )}
          {/* 펫 이름 및 펫 정보 */}
          {step !== 0 && (
            <>
              {/* 펫 이름 */}
              <div
                className={`absolute top-[10%] left-[50%] translate-x-[-50%] max-w-[70%] text-white bg-black/40 backdrop-blur-sm p-2 rounded-3xl truncate text-ellipsis flex justify-center items-center ${
                  step === 2 ? "text-lg" : "text-[0.8rem]"
                }`}
              >
                {name}
              </div>
              {/* 펫 정보 */}
              <div
                className={`flex flex-col items-center justify-center absolute bottom-[10px] left-[50%] translate-x-[-50%] w-[90%] bg-black/40 text-white  rounded-lg ${
                  step === 2
                    ? "min-h-[124px] text-xs"
                    : "min-h-[80px] text-[0.5rem]"
                }`}
              >
                <div className="w-full h-full backdrop-blur-sm p-2 px-4 rounded-lg ">
                  <div className="w-full  border-b-2 flex flex-col gap-1 pb-2 ">
                    <div className="flex justify-between">
                      <div className="">
                        <span className="mr-4">나이</span>
                        {age}
                      </div>
                      <div className="mr-2">
                        <span className="mr-4">성별</span>
                        {gender}
                      </div>
                    </div>
                    <div>
                      <span className="mr-4">정보</span>
                      {info}
                    </div>
                  </div>
                  <div className="w-full flex justify-between mt-2">
                    <span className="mr-4">성격</span>
                    <div className="grow grid grid-cols-3 gap-1">
                      {makeTags(characters, step)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      }
    </>
  );
};
