import Autoplay from 'embla-carousel-autoplay';

import { Brand, BrandsCarouselProps } from '@org/models';
import { useCallback, useRef, type KeyboardEvent } from 'react';
import BrandBadge from '../badge/BrandBadge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { cn } from '../utils';


// ============================================================================
// Component
// ============================================================================

/**
 * BrandsCarousel - An autoplay carousel showcasing brand badges
 *
 * @example
 * ```tsx
 * const brands = [
 *   { id: '1', name: 'Nike' },
 *   { id: '2', name: 'Adidas' },
 *   { id: '3', name: 'Puma' },
 * ];
 *
 * <BrandsCarousel
 *   brands={brands}
 *   autoplayDelay={3000}
 *   pauseOnHover
 *   onBrandClick={(brand) => navigate(`/brands/${brand.id}`)}
 * />
 * ```
 */
export function BrandsCarousel({
  brands,
  autoplayDelay = 3000,
  stopOnInteraction = false,
  pauseOnHover = true,
  showNavigation = true,
  badgeVariant = 'secondary',
  className,
  onBrandClick,
  loop = true,
}: Readonly<BrandsCarouselProps>) {
  // Create autoplay plugin with a ref to maintain instance across renders
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction,
      stopOnMouseEnter: pauseOnHover,
      playOnInit: true,
    })
  );

  // Handle brand click - navigate or trigger callback
  const handleBrandClick = useCallback(
    (brand: Brand) => {
      onBrandClick?.(brand);
    },
    [onBrandClick]
  );

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (event: KeyboardEvent, brand: Brand) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleBrandClick(brand);
      }
    },
    [handleBrandClick]
  );

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop,
        dragFree: true,
      }}
      plugins={[autoplayPlugin.current]}
      className={cn('w-full', className)}
      // Pause/resume autoplay on mouse enter/leave
      onMouseEnter={
        pauseOnHover ? () => autoplayPlugin.current.stop() : undefined
      }
      onMouseLeave={
        pauseOnHover ? () => autoplayPlugin.current.play() : undefined
      }
    >
      <CarouselContent className="-ml-2 md:-ml-4 items-center">
        {brands.map((brand) => (
          <CarouselItem
            key={brand.id}
            className="basis-auto pl-2 md:pl-4"
          >
            <BrandBadge
              brand={brand}
              variant={badgeVariant}
              onClick={handleBrandClick}
              onKeyDown={handleKeyDown}
              clickable={!!onBrandClick}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && brands.length > 3 && (
        <>
          <CarouselPrevious className="left-0 -translate-x-1/2 opacity-70 hover:opacity-100" />
          <CarouselNext className="right-0 translate-x-1/2 opacity-70 hover:opacity-100" />
        </>
      )}
    </Carousel>
  );
}

export default BrandsCarousel;
