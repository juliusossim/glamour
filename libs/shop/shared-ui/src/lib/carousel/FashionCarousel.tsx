import { Product } from "@org/models";
import { PropsWithChildren } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { MediaRenderer } from "../media";

export interface FashionCarouselProps extends PropsWithChildren {
  readonly product: Product;
}

export function FashionCarousel({ product, children }: FashionCarouselProps) {
  return (
    <Carousel className="w-full py-0 group">
      <CarouselContent className="py-0">
        {children ?? product.imageUrls.map((url) => (
          <CarouselItem key={url} className="ml-0">
             <MediaRenderer
              source={{url}}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Carousel>
  )
}
