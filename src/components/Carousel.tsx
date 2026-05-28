import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function Carousel({ images, autoSlide = true, autoSlideInterval = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, images.length]);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full bg-gray-200 rounded-2xl overflow-hidden shadow-sm mx-4 mt-4">
      {/* Images Container */}
      <div className="relative h-40 flex items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'bg-white w-6'
                    : 'bg-white/50 w-2 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
