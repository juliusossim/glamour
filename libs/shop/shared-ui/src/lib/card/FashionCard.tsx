import { Handshake } from "lucide-react";
import { Amount, BrandsCarousel, SmallText, SocialInteractions, StarRating, Text, TruncatedText } from "../..";
import { FashionCarousel } from "../carousel/FashionCarousel";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Item, ItemContent } from "../ui/item";
import { defaultBrands, defaultProduct } from "../utils/mock";
import { SOLD_TEXT, VIEW_DETAILS_TEXT } from "../utils/text/fashionCard";

export function FashionCard() {

  return (
    <Card className="w-full max-w-sm gap-0 pt-0 rounded-lg overflow-hidden">
       <FashionCarousel product={defaultProduct} />
      <CardHeader className="gap-0 ">
        <CardTitle>
            <Item className="py-0 px-0 gap-0 flex-col items-start">
                <ItemContent className="flex flex-row justify-between w-full">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{defaultProduct.name}</h3>
                </ItemContent>
               <Amount price={defaultProduct.price} originalPrice={15000000} locale="en-NG" />
            </Item>
        </CardTitle>
        <CardDescription>
          <TruncatedText tooltipSide="bottom" text={defaultProduct.description} lineClamp={2} className="text-sm text-muted-foreground" />
        </CardDescription>
        <CardAction>
          <Button variant="secondary" className="cursor-pointer hover:text-primary/80 ">
            <Handshake size={16} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-row items-center align-center gap-1">
        <StarRating rating={defaultProduct.rating} size={12} showValue className="my-2" />
        <Text className="flex flex-row gap-0.5 text-sm text-muted-foreground"><SmallText role="img" aria-label="hot" className="">🔥</SmallText>6k+ {SOLD_TEXT}</Text>
        <ItemContent className="max-w-40">
          <BrandsCarousel brands={defaultBrands} showNavigation={false} badgeVariant="outline" />
        </ItemContent>
      </CardContent>
      <CardFooter className="flex-col gap-0 mt-1">
        <Button type="submit" className="w-1/2 cursor-pointer">
          {VIEW_DETAILS_TEXT}
        </Button>
        <SocialInteractions productId="1" />
      </CardFooter>
    </Card>
  )
}
export default FashionCard;