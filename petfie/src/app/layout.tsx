import "./globals.css";
import { Theme } from "@radix-ui/themes";


export const metadata = {
  title: "Petfie | 반려동물을 자랑할 땐 펫피",
  description: "카드로 만드는 반려동물과의 추억",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 기본 메타 태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/asset/opengraph-image.jpg" />
        {/* 내부에 업로드한 OG 이미지 URL을 사용 */}
      </head>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
