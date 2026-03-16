import Autoplay from 'embla-carousel-autoplay';

import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import { cn } from '../../utils';
import { CarouselWrapperProps } from './types';

// ============================================================================
// Component
// ============================================================================

/**
 * CarouselWrapper - A flexible carousel wrapper component
 *
 * @example
 * ```tsx
 * const brands = [
 *   { id: '1', name: 'Nike' },
 *   { id: '2', name: 'Adidas' },
 *   { id: '3', name: 'Puma' },
 * ];
 *
 * <CarouselWrapper
 *   autoplayDelay={3000}
 *   pauseOnHover
 * >
 *   {brands.map((brand) => (
 *     <BrandBadge key={brand.id} brand={brand} />
 *   ))}
 * </CarouselWrapper>
 * ```
 */
export function CarouselWrapper({
  children,
  autoplayDelay = 3000,
  dragFree = true,
  stopOnInteraction = false,
  pauseOnHover = true,
  showNavigation = true,
  classes,
  loop = true,
  orientation = 'horizontal',
  autoplay = true,
}: Readonly<CarouselWrapperProps>) {
  // Create autoplay plugin with a ref to maintain instance across renders
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction,
      stopOnMouseEnter: pauseOnHover,
      playOnInit: true,
    })
  );

  if (!children) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop,
        dragFree,
      }}
      plugins={autoplay ? [autoplayPlugin.current] : []}
      className={cn(
        'group w-full',
        classes?.wrapper,
        orientation === 'vertical' &&
          '**:data-[slot=carousel-content]:h-full [&_[data-slot=carousel-content]>div]:h-full'
      )}
      // Pause/resume autoplay on mouse enter/leave
      onMouseEnter={
        pauseOnHover && autoplay
          ? () => autoplayPlugin.current.stop()
          : undefined
      }
      onMouseLeave={
        pauseOnHover && autoplay
          ? () => autoplayPlugin.current.play()
          : undefined
      }
      orientation={orientation}
    >
      <CarouselContent
        className={cn('-ml-2 md:-ml-4 items-center', classes?.content)}
      >
        {children}
      </CarouselContent>

      {showNavigation && (
        <>
          <CarouselPrevious
            className={cn(
              'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100',
              classes?.prev
            )}
          />
          <CarouselNext
            className={cn(
              'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100',
              classes?.next
            )}
          />
        </>
      )}
    </Carousel>
  );
}

export default CarouselWrapper;
