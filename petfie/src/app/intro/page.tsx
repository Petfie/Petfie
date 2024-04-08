'use client';

import Image from "next/image";
import Link from "next/link";
import "./page.css";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Modal from "./Modal"
import React, { useState } from "react";

export default function Intro() {
  const [modalOpen, setModalOpen] = useState(false); 

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-[20px] min-h-[100dvh]">
      <div className="title-cont">
        <h1>
          <Image
          src="/asset/logo.png"
          alt="Petfie 로고 이미지"
          width={110}
          height={36}
          />
        </h1>
        <QuestionMarkCircledIcon
          width={32} 
          height={32} 
          onClick={handleIconClick}
        />
      </div>
      <h2 className="comment">반려동물과의 추억을<br/>나만의 카드를 담아보세요</h2>
      <Image
        className="preview-img"
        src="/asset/main_preview.png"
        alt="미리보기 이미지"
        width={200}
        height={200}
      />
      <div className="button-cont">
        <Link href={"/main"}>
          <button className="start-button button-next">시작하기</button>
        </Link>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}
