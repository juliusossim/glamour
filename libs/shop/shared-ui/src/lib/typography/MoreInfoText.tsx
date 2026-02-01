import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import { HoverCardProps } from "@org/models";

export function MoreInfoText({
  openDelay = 10, closeDelay = 100,title, children,
   content, className, onOpenChange, open
}: Readonly<HoverCardProps>) {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay} open={open} onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild>
       {title}
      </HoverCardTrigger>
      <HoverCardContent className={className}>
        {children ?? content}
      </HoverCardContent>
    </HoverCard>
  )
}
export default MoreInfoText;
