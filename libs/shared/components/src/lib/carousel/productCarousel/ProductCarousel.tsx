import type { Product } from '@org/models';
import type { PropsWithChildren } from 'react';
import { MediaRenderer } from '../../media';
import { CarouselItem } from '../../ui/carousel';
import CarouselWrapper from '../carouselWrapper/CarouselWrapper';

export interface ProductCarouselProps extends PropsWithChildren {
  readonly product: Product;
}

export function ProductCarousel({
  product,
  children,
}: Readonly<ProductCarouselProps>) {
  return (
    <CarouselWrapper
      showNavigation={true}
      autoplay={false}
      loop={false}
      classes={{
        prev: 'left-2 ',
        next: 'right-2',
      }}
    >
      {children ??
        product.imageUrls.map((url) => (
          <CarouselItem
            key={url}
            className="ml-0 h-50 lg:h-55 xl:h-60 2xl:h-72"
          >
            <MediaRenderer
              source={{ url }}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
    </CarouselWrapper>
  );
}
