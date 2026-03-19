import { detectMediaType } from '../../hooks';
import { Button } from '../../ui/button';
import type { Product } from '@org/models';
import type { PropsWithChildren } from 'react';
import { MediaRenderer } from '../../media';
import { CarouselItem } from '../../ui/carousel';
import CarouselWrapper from '../carouselWrapper/CarouselWrapper';

export interface ProductCarouselProps extends PropsWithChildren {
  readonly product: Product;
  readonly onImageClick?: (args: { url: string; index: number }) => void;
}

export function ProductCarousel({
  product,
  onImageClick,
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
        product.imageUrls.map((url, index) => {
          const isImage = detectMediaType({ url }) === 'image';
          console.log(
            `Media URL: ${url}, Detected type: ${detectMediaType({ url })}`
          );

          return (
            <CarouselItem
              key={url}
              className="ml-0 h-50 lg:h-55 xl:h-60 2xl:h-72"
              aria-label={`Open slide ${index + 1} of ${
                product.name
              } in full viewer`}
            >
              {isImage && onImageClick ? (
                <Button
                  onClick={() =>
                    onImageClick({
                      url,
                      index,
                    })
                  }
                  variant="ghost"
                  className="w-full h-full p-0"
                >
                  <MediaRenderer
                    source={{ url }}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Button>
              ) : (
                <MediaRenderer
                  source={{ url }}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </CarouselItem>
          );
        })}
    </CarouselWrapper>
  );
}
