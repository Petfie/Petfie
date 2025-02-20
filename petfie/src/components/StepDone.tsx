"use client";

import React, { useState } from "react";
import { CheckIcon, CopyIcon, DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

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
  };

  const socialClick = () => {
    window.alert("준비 중입니다.");
  };

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <button
        className="flex items-center justify-center gap-2 w-full rounded-md bg-brand-orange-500 px-2 py-3 text-white"
        onClick={saveAsImage}
      >
        <DownloadIcon width={20} height={20} />
        카드 다운로드
      </button>
      <div className="flex flex-col w-full mb-8">
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
          <div className="bg-white border border-neutral-300 p-3 rounded-md">
            {isCopied ? (
              <CheckIcon className="text-green-500" />
            ) : (
              <CopyIcon onClick={copyLink} className="text-brand-orange-500" />
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-3">
          <Image
            alt="instagram"
            src={"/asset/instagram_logo.png"}
            width={38}
            height={38}
            quality={90}
            className="cursor-pointer"
            onClick={socialClick}
          />
          <Image
            alt="kakao"
            src={"/asset/kakao_logo.png"}
            width={38}
            height={38}
            quality={90}
            className="cursor-pointer"
            onClick={socialClick}
          />
          <Image
            alt="twitter"
            src={"/asset/twitter_logo.png"}
            width={38}
            height={38}
            quality={90}
            className="cursor-pointer"
            onClick={socialClick}
          />
        </div>
      </div>
    </div>
  );
};
