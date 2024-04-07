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
    "/asset/Bframe1.svg",
    "/asset/Wframe1.svg",
    "/asset/Bframe2.svg",
    "/asset/Wframe2.svg",
    "/asset/Bframe3.svg",
    "/asset/Wframe3.svg",
    "/asset/Bframe4.svg",
    "/asset/Wframe4.svg",
    "/asset/Bframe5.svg",
    "/asset/Wframe5.svg",
    "/asset/Bframe6.svg",
    "/asset/Wframe6.svg",
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
      breakpoints={{
        750: {
          slidesPerView: 4,
          spaceBetween: 10,
          coverflowEffect: {
            rotate: 30,
          }
        },
      }}
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
