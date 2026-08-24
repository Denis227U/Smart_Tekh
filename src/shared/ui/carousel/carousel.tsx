'use client';

import { Swiper, type SwiperProps } from 'swiper/react';
import { Slide } from './slide';
import 'swiper/css';

interface CarouselProps extends SwiperProps {
  children: React.ReactNode;
  paginationClassName?: string;
}

export const Carousel = ({
  children,
  paginationClassName,
  modules = [],
  ...rest
}: CarouselProps) => {
  return (
    <Swiper
      modules={modules}
      {...rest}
    >
      {children}

      {paginationClassName && (
        <ul
          slot='container-end'
          className={paginationClassName}
        ></ul>
      )}
    </Swiper>
  );
};

Slide.displayName = 'SwiperSlide';
Carousel.Slide = Slide;
