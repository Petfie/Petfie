"use client";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

interface Props {
  setImageData: (data: string) => void;
}
export default function ImageUpload({ setImageData }: Props) {
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
    <div className="absolute w-full flex justify-center top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-orange-600 text-sm">
      <Button
        onClick={openFileUpload}
        variant="classic"
        color="orange"
        className="border-orange-600 border-2 p-2 flex items-center justify-center gap-2 rounded-lg bg-white"
      >
        <UploadIcon />
        <span className="mt-1">Image Upload</span>
        <input
          name="file-upload"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
        />
      </Button>
    </div>
  );
}
