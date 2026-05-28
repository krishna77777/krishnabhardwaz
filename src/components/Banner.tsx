import React from 'react';
import Carousel from './Carousel';

const bannerImages = [
  '/WhatsApp_Image_2026-05-25_at_11.55.56_PM.jpeg',
  '/WhatsApp_Image_2026-05-25_at_11.55.56_PM_(1).jpeg',
  '/WhatsApp_Image_2026-05-25_at_11.55.57_PM.jpeg',
  '/WhatsApp_Image_2026-05-25_at_11.55.57_PM_(1).jpeg',
  '/WhatsApp_Image_2026-05-25_at_11.55.57_PM_(2).jpeg',
];

export default function Banner() {
  return (
    <div>
      <Carousel images={bannerImages} autoSlide={true} autoSlideInterval={4000} />
    </div>
  );
}
