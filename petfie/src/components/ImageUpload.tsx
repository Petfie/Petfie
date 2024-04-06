"use client";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [imageData, setImageData] = useState<string>();

  const openFileUpload = () => {
    const fileUpload = document.querySelector(
      "input[name=file-upload]"
    ) as HTMLInputElement;
    fileUpload?.click();
    fileUpload?.addEventListener("change", (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const reader = new FileReader();
        reader.onload = function () {
          const dataURL = reader.result;
          console.log("dataURL", dataURL);
          setImageData(dataURL as string);
        };

        reader.readAsDataURL(files[0]);

        // 이런 방법도 있더라
        // const test = URL.createObjectURL(files[0]);
        // console.log("test", test);
        // setImageData(test);
      }
    });
  };

  return (
    <>
      <Button onClick={openFileUpload}>
        <h1>Image Upload</h1>
        <input
          name="file-upload"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
        />
      </Button>
      {/* image data 영역 */}
      <div>
        <h2>Image Data</h2>
        {imageData && (
          <Image src={imageData} width={200} height={200} alt={"test image"} />
        )}
      </div>
    </>
  );
}
