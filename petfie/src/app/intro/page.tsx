import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function intro() {
  return (
    <>
      <h1>Petfie</h1>
      <div>
        <h2>반려동물로 카드를 만들어보세요</h2>
        <h3>나만의 유니크한 반려동물 카드 친구에게 공유하며 자랑해요</h3>
      </div>
      <ul className="grid-cols-2">
        <li>
          <Image
            src="/asset/완성카드.png"
            alt="미리보기 이미지"
            width={200}
            height={200}
          />
        </li>
      </ul>
      <Link href={"/main"}>
        <Button>시작하기</Button>
      </Link>
    </>
  );
}
