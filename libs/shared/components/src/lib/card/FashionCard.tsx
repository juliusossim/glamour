import type { DisplayProduct } from '@org/models';
import { buildPath, ROUTE_PATHS } from '@org/shared-data';
import { Eye, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Amount,
  BrandsCarousel,
  SmallText,
  SocialInteractions,
  StarRating,
  Text,
  TruncatedText,
} from '../..';
import { BadgeVariants } from '../carousel/brandCarousel/types';
import { ProductCarousel } from '../carousel/productCarousel/ProductCarousel';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Item, ItemContent } from '../ui/item';
import { defaultBrands } from '../utils/mock';
import { SOLD_TEXT } from '../utils/text/fashionCard';

export function FashionCard({
  product,
}: Readonly<{ product: DisplayProduct }>) {
  const productDetailPath = buildPath(ROUTE_PATHS.PRODUCT_DETAIL, {
    id: product.id,
  });

  return (
    <Card className="w-full max-w-sm gap-0 pt-0 rounded-lg overflow-hidden">
      <ProductCarousel product={product} />
      <CardHeader className="gap-0 ">
        <CardTitle>
          <Item className="py-0 px-0 gap-0 flex-col items-start">
            <ItemContent className="flex flex-row justify-between w-full">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {product.name}
              </h3>
            </ItemContent>
            <Amount price={product.price.best} discount={23} locale="en-NG" />
          </Item>
        </CardTitle>
        <CardDescription>
          <TruncatedText
            tooltipSide="bottom"
            text={product.description}
            lineClamp={2}
            className="text-sm text-muted-foreground"
          />
        </CardDescription>
        <CardAction>
          <Button
            variant="secondary"
            className="cursor-pointer hover:text-primary/80 "
          >
            <Handshake size={16} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-row items-center align-center gap-1">
        <ItemContent className="max-w-60">
          <BrandsCarousel
            brands={defaultBrands}
            showNavigation={false}
            badgeVariant={BadgeVariants.OUTLINE}
          />
        </ItemContent>
      </CardContent>
      <CardFooter className="flex-col gap-0 mt-1">
        <div className="flex flex-row items-center justify-between w-full">
          <StarRating
            rating={product.rating}
            size={12}
            showValue
            className="my-2"
          />
          <Text className="flex flex-row flex-nowrap gap-0.5 text-sm text-muted-foreground">
            <SmallText role="img" aria-label="hot" className="">
              <span role="img" aria-label="hot">
                🔥
              </span>
            </SmallText>
            <SmallText>6k+ </SmallText>
            <SmallText>{SOLD_TEXT}</SmallText>
          </Text>
          <Button>
            <Link
              to={productDetailPath}
              className="flex flex-row items-center gap-1"
            >
              <Eye />
            </Link>
          </Button>
        </div>

        <SocialInteractions productId="1" />
      </CardFooter>
    </Card>
  );
}
export default FashionCard;
