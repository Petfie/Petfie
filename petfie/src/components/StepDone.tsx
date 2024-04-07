import React, { useRef, useState } from "react";
import { Button } from "@radix-ui/themes";
import { CheckIcon, CopyIcon, DownloadIcon } from "@radix-ui/react-icons";
import * as Label from "@radix-ui/react-label";

interface StepDoneProps {
  saveAsImage: () => void;
}

export const StepDone = ({ saveAsImage }: StepDoneProps) => {
  // 공유하기 URL state
  const [url, setUrl] = useState("https://petfie.vercel.app/intro");

  // copy
  const [isCopied, setIsCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
    });
    // TODO: add toast
  };

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <button
        className="flex items-center justify-center gap-2 w-full rounded-md bg-brand-orange-500 px-2 py-3 text-white"
        onClick={saveAsImage}
      >
        <DownloadIcon />
        카드 다운로드
      </button>
      <div className="flex flex-col w-full">
        <label className="text-sm mb-2" htmlFor="copy">
          공유하기
        </label>
        <div className="flex gap-2 items-center">
          <input
            className="w-full border border-neutral-300 p-[0.55rem] text-sm rounded-md"
            type="text"
            id="copy"
            defaultValue={url}
          />
          <div className="border border-neutral-300 p-3 rounded-md">
            {isCopied ? <CheckIcon /> : <CopyIcon onClick={copyLink} />}
          </div>
        </div>
      </div>
    </div>
  );
};
