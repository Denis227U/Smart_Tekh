import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { CarouselModule, CarouselType } from '@/src/shared/ui/client';

interface BaseResult {
  mainCarouselRef: RefObject<CarouselType | null>;
  thumbsCarouselRef: RefObject<CarouselType | null>;
  mainModules: CarouselModule[];
  initMainCarousel: (carousel: CarouselType) => void;
  initThumbsCarousel: (carousel: CarouselType) => void;
}

interface ExtendedResult extends BaseResult {
  activeThumbIndex: number;
  setActiveThumbIndex: Dispatch<SetStateAction<number>>;
}

export function useCarouselThumbsSync(params: {
  initialMainModules: CarouselModule[];
  shouldUpdateThumbIndex: true;
}): ExtendedResult;
export function useCarouselThumbsSync(params: {
  initialMainModules: CarouselModule[];
  shouldUpdateThumbIndex?: false;
}): BaseResult;

/**
 * Syncs a main carousel with a thumbnail carousel on slide change.
 * It listens to the main carousel's slide changes and automatically scrolls the
 * thumbnail carousel to the corresponding slide.
 *
 * @param params - Hook configuration.
 * @param params.initialMainModules - Initial carousel modules/plugins.
 * @param [params.shouldUpdateThumbIndex=false] - If true, enables and returns React state for the active index.
 * @returns {BaseResult | ExtendedResult} Refs, init functions, modules, and optional active index state.
 */
export function useCarouselThumbsSync({
  initialMainModules,
  shouldUpdateThumbIndex = false,
}: {
  initialMainModules: CarouselModule[];
  shouldUpdateThumbIndex?: boolean;
}) {
  const mainCarouselRef = useRef<CarouselType | null>(null);
  const thumbsCarouselRef = useRef<CarouselType | null>(null);

  const [mainCarousel, setMainCarousel] = useState<CarouselType | null>(null);
  const [mainModules] = useState(() => [...initialMainModules]);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  useEffect(() => {
    if (!mainCarousel || mainCarousel.destroyed) return;

    const handleSlideChange = () => {
      const targetIndex = mainCarousel.realIndex ?? mainCarousel.activeIndex;

      if (shouldUpdateThumbIndex) {
        setActiveThumbIndex(targetIndex);
      }

      const thumbs = thumbsCarouselRef.current;
      if (thumbs && !thumbs.destroyed) {
        if (typeof thumbs.slideToLoop === 'function' && thumbs.params?.loop) {
          thumbs.slideToLoop(targetIndex);
        } else if (typeof thumbs.slideTo === 'function') {
          thumbs.slideTo(targetIndex);
        }
      }
    };

    mainCarousel.on('slideChange', handleSlideChange);
    handleSlideChange();

    return () => {
      if (!mainCarousel.destroyed) {
        mainCarousel.off('slideChange', handleSlideChange);
      }
    };
  }, [mainCarousel, shouldUpdateThumbIndex]);

  const initMainCarousel = (carousel: CarouselType) => {
    mainCarouselRef.current = carousel;
    setMainCarousel(carousel);
  };

  const initThumbsCarousel = (carousel: CarouselType) => {
    thumbsCarouselRef.current = carousel;
  };

  const result = {
    mainCarouselRef,
    thumbsCarouselRef,
    mainModules,
    initMainCarousel,
    initThumbsCarousel,
  };

  if (shouldUpdateThumbIndex) {
    return { ...result, activeThumbIndex, setActiveThumbIndex };
  }

  return result;
}
