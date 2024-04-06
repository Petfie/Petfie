import React, { useState } from "react";
import Image from "next/image";
import { Button, TextField } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import * as Label from "@radix-ui/react-label";

export const StepDone = () => {
  // 공유하기 URL state
  const [url, setUrl] = useState("http://~");

  // copy
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    // TODO: add toast
  };

  return (
    <div className="">
      <Button variant="outline">카드 다운로드</Button>
      <div className="flex flex-col">
        <Label.Root className="LabelRoot" htmlFor="공유하기">
          공유하기
        </Label.Root>
        <div className="flex flex-row gap-1 justify-between">
          <input className="Input" type="text" id="copy" defaultValue={url} />
          <CopyIcon onClick={copyLink} />
        </div>
      </div>
    </div>
  );
};
