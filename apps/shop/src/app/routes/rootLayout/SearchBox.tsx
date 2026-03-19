import {
  Item,
  ItemContent,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  Popover,
  PopoverAnchor,
  PopoverContent,
  SearchInput,
  SmallText,
} from '@org/shared-ui';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const SearchBox = () => {
  const form = useForm({
    defaultValues: {
      search: '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [anchorWidth, setAnchorWidth] = useState<number>();
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchorElement = anchorRef.current;

    if (!anchorElement) {
      return undefined;
    }

    const updateWidth = () => {
      setAnchorWidth(anchorElement.getBoundingClientRect().width);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(anchorElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const applySuggestion = (value: string) => {
    form.setValue('search', value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsOpen(false);
  };

  return (
    <FormProvider {...form}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div ref={anchorRef} className="w-full max-w-xl">
          <PopoverAnchor asChild>
            <div>
              <SearchInput
                name="search"
                placeholder="Search for products, brands, and more..."
                onFocus={() => setIsOpen(true)}
              />
            </div>
          </PopoverAnchor>
        </div>

        <PopoverContent
          align="start"
          className="w-auto p-4 "
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            const target = event.target;

            if (target instanceof Node && anchorRef.current?.contains(target)) {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
          side="bottom"
          sideOffset={8}
          style={anchorWidth ? { width: `${anchorWidth}px` } : undefined}
        >
          <div className="flex flex-col gap-3">
            <SmallText>Suggestions</SmallText>
            <Item
              size="sm"
              onClick={() => applySuggestion('Sneakers')}
              className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
            >
              <ItemMedia>
                <Search size={16} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Search for "Sneakers"</ItemTitle>
              </ItemContent>
            </Item>
            <ItemSeparator />
            <SmallText>Recent Searches</SmallText>
            <Item
              variant="muted"
              size="sm"
              onClick={() => applySuggestion('Sneakers')}
              className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
            >
              <ItemMedia>
                <Search size={16} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Search for "Sneakers"</ItemTitle>
              </ItemContent>
            </Item>
          </div>
        </PopoverContent>
      </Popover>
    </FormProvider>
  );
};

export default SearchBox;
