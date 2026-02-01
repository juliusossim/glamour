import type { SocialInteractionsProps } from "@org/models";
import { useInteractions } from "@org/shop-data";
import { Heart, Repeat2, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Item } from "../ui/item";

export function SocialInteractions({ productId }: SocialInteractionsProps) {
  const {
    interactions,
    loading,
    toggleLike,
    toggleShare,
    toggleReglam,
    isLiking,
    isSharing,
    isReglaming,
  } = useInteractions(productId);

  return (
    <Item>
      <div className="flex flex-col gap-0.5 items-center">
        <Button
          size="icon"
          variant="ghost"
          className="p-0 cursor-pointer text-burgundy hover:bg-burgundy hover:text-foreground"
          onClick={() => toggleLike()}
          disabled={isLiking || loading}
        >
          <Heart
            className={interactions.userLiked ? "fill-burgundy" : ""}
            width={25}
          />
        </Button>
        <span className="text-xs text-muted-foreground">
          {interactions.likes.toLocaleString()} Likes
        </span>
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <Button
          size="icon"
          variant="ghost"
          className="p-0 cursor-pointer hover:bg-accent text-accent hover:text-foreground"
          onClick={() => toggleShare()}
          disabled={isSharing || loading}
        >
          <Share2
            className={interactions.userShared ? "fill-accent" : ""}
            // width={25}
          />
        </Button>
        <span className="text-xs text-muted-foreground">
          {interactions.shares.toLocaleString()} Shares
        </span>
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <Button
          variant="ghost"
          className="p-0 cursor-pointer text-emerald hover:text-foreground hover:bg-emerald"
          onClick={() => toggleReglam()}
          disabled={isReglaming || loading}
        >
          <Repeat2
            className={interactions.userReglammed ? "fill-emerald" : ""}
            width={25}
          />
        </Button>
        <span className="text-xs text-muted-foreground">
          {interactions.reglams.toLocaleString()} Reglams
        </span>
      </div>
    </Item>
  );
}

export default SocialInteractions;