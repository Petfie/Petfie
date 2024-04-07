"use client";

import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { EffectCoverflow } from "swiper/modules";

interface Props {
  changeFrame: (frameUrl: string) => void;
}
export default function Carousel({ changeFrame }: Props) {
  // const [swiper, setSwiper] = useState<SwiperClass>();
  // const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const images = [
    "/asset/카드프레임1.svg",
    "/asset/카드프레임2.svg",
    "/asset/카드프레임3.svg",
    "/asset/카드프레임4.svg",
    "/asset/카드프레임5.svg",
    "/asset/카드프레임6.svg",
  ];

  const handleSlideChange = (swiper: SwiperClass) => {
    console.log("현재 활성 슬라이드의 인덱스:", swiper.realIndex);
    // setActiveSlideIndex(swiper.realIndex);
    changeFrame(images[swiper.realIndex]);
  };

  return (
    <Swiper
      effect={"coverflow"}
      slidesPerView={3}
      spaceBetween={5}
      navigation={true}
      loop={true}
      centeredSlides={true}
      className="carousel"
      onSlideChange={handleSlideChange}
      coverflowEffect={{
        rotate: 60,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`카드프레임 ${index + 1}`}
            width={106}
            height={152}
            className=""
            priority={false}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
