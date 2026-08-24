import { SwiperSlide, type SwiperSlideProps } from 'swiper/react';

export const Slide: React.FC<SwiperSlideProps> = (props) => {
  const { children, ...rest } = props;
  return <SwiperSlide {...rest}>{children}</SwiperSlide>;
};
