import { toSvg } from "html-to-image";

/** URL에서 이미지를 로드하고 HTMLImageElement를 반환 */
export const createImage = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      setTimeout(() => {
        resolve(img);
      }, 200);
    img.decode = async () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = url;
  });
};

/** HTMLDivElement 노드의 내용을 PNG 이미지로 변환 */
export const toPng = async (node: HTMLDivElement) => {
  const { offsetWidth: width, offsetHeight: height } = node;
  const multiple = 2;

  const svgDataUrl = await toSvg(node);

  const canvas = document.createElement("canvas");
  const offscreenCanvas = canvas.transferControlToOffscreen();
  offscreenCanvas.width = width * multiple;
  offscreenCanvas.height = height * multiple;
  const context = offscreenCanvas.getContext("2d", { alpha: false });
  if (context === null) return "";

  const img: HTMLImageElement = await createImage(svgDataUrl);

  let done = false;
  const onFrame = () => {
    context.drawImage(img, 0, 0, width * multiple, height * multiple);
    if (canvas.toDataURL("image/png", 1.0).length > 204800) done = true;
    if (!done) {
      window.requestAnimationFrame(onFrame);
    }
  };
  onFrame();

  return new Promise((resolve: (url: string) => void) => {
    setTimeout(() => {
      const url = canvas.toDataURL("image/png", 1.0);
      resolve(url);
    }, 500);
  });
};
