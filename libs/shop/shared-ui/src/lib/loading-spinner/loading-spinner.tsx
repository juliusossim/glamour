import { LoadingSpinnerProps } from '@org/models';
import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item';
import { Spinner } from '../ui/spinner';
export function LoadingSpinner(props: Readonly<LoadingSpinnerProps>) {
  return (
      <Item 
        variant="muted"
        className="max-w-2xl max-h-dvw flex flex-col gap-4 [--radius:1rem]"
      >
        <ItemContent>
          <ItemTitle className="line-clamp-1">{props.title}</ItemTitle>
        </ItemContent>
        <ItemMedia className=" max-w-2xs h-48 rounded-lg overflow-hidden">
          <img src={props.imageUrl} alt="" />
        </ItemMedia>
        <ItemContent className="flex flex-row items-center justify-between gap-4">
          <p className="text-sm">{props.message}</p>
            <ItemMedia>
          <Spinner />
        </ItemMedia>
        </ItemContent>
      </Item>
  );
}

export default LoadingSpinner;
