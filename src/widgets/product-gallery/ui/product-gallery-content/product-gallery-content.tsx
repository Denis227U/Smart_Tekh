'use client';

import Image from 'next/image';
import { ProductImageDto } from '@/src/entities/product';
import {
  Carousel,
  CarouselNavigation,
  CarouselThumbs,
} from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import { useCarouselThumbsSync } from '../../lib/use-carousel-thumbs-sync';
import s from './product-gallery-content.module.scss';

export const ProductGalleryContent = ({
  images,
}: {
  images: ProductImageDto[];
}) => {
  const {
    mainCarouselRef,
    thumbsCarouselRef,
    mainModules,
    activeThumbIndex,
    initMainCarousel,
    initThumbsCarousel,
  } = useCarouselThumbsSync({
    initialMainModules: [CarouselNavigation, CarouselThumbs],
    shouldUpdateThumbIndex: true,
  });

  const prevButtonSelector = '[data-carousel-action="prev"]';
  const nextButtonSelector = '[data-carousel-action="next"]';

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.arrows}>
          <button
            type='button'
            className={s.arrow}
            data-carousel-action='prev'
          >
            <Icon
              name='ArrowRight'
              aria-hidden='true'
              size={14}
            />
          </button>
          <button
            type='button'
            className={s.arrow}
            data-carousel-action='next'
          >
            <Icon
              name='ArrowRight'
              aria-hidden='true'
              size={14}
            />
          </button>
        </div>

        <Carousel
          modules={mainModules}
          navigation={{
            prevEl: prevButtonSelector,
            nextEl: nextButtonSelector,
          }}
          onSwiper={initMainCarousel}
          className={s.mainGallery}
        >
          {images.map((image, index) => (
            <Carousel.Slide
              key={image.id}
              className={s.mainSlide}
            >
              <Image
                src={image.url}
                fill
                alt={image.alt ?? ''}
                sizes='(max-width: 1024px) 100vw, 530px'
                preload={index === 0}
              />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Carousel
          modules={[CarouselThumbs]}
          slideToClickedSlide={true}
          onSwiper={initThumbsCarousel}
          slidesPerView={3}
          spaceBetween={8}
          watchSlidesProgress={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          className={s.thumbsGallery}
        >
          {images.map((image, index) => (
            <Carousel.Slide
              key={image.id}
              className={s.thumbsSlide}
              data-active={index === activeThumbIndex || undefined}
              onClick={() => {
                mainCarouselRef.current?.slideTo(index);
                thumbsCarouselRef.current?.slideTo(index);
              }}
            >
              <Image
                src={image.thumbnail ?? image.url}
                width={52}
                height={52}
                alt={image.alt ?? ''}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
