import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
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
    <div className="">
      <Button variant="outline" onClick={saveAsImage}>
        카드 다운로드
      </Button>
      <div className="flex flex-col">
        <Label.Root className="LabelRoot" htmlFor="공유하기">
          공유하기
        </Label.Root>
        <div className="flex gap-2 items-center">
          <input className="Input" type="text" id="copy" defaultValue={url} />
          {isCopied ? <CheckIcon /> : <CopyIcon onClick={copyLink} />}
        </div>
      </div>
    </div>
  );
};
