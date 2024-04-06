'use client';

import React, { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import { EffectCoverflow } from 'swiper/modules';

export default function Carousel() {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const images = [
    "/asset/카드프레임1.svg",
    "/asset/카드프레임2.svg",
    "/asset/카드프레임3.svg",
    "/asset/카드프레임4.svg",
    "/asset/카드프레임5.svg",
    "/asset/카드프레임6.svg",
  ];

  const handleSlideChange = (swiper: SwiperClass) => {
    console.log('현재 활성 슬라이드의 인덱스:', swiper.realIndex);
    setActiveSlideIndex(swiper.realIndex);
  };
  
  return (
    <Swiper
      effect={'coverflow'}
      slidesPerView={3}
      spaceBetween={5}
      navigation={true}
      loop={true}
      centeredSlides={true}
      className="carousel bg-gray-200 h-[262px] w-[393px]"
      onSlideChange={handleSlideChange}
      coverflowEffect={{
        rotate: 60,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false
      }}
      modules={[EffectCoverflow]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <Image
            src={image}
            alt={`카드프레임 ${index + 1}`}
            width={106}
            height={152}
            className='mt-[50px]'
            priority={false}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

