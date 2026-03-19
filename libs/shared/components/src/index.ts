// Shared components
export { Amount } from './lib/amount/Amount';
export { BrandBadge } from './lib/badge/BrandBadge';
export { FashionCard } from './lib/card/FashionCard';
export { BrandsCarousel } from './lib/carousel/brandCarousel/BrandsCarousel';
export { ErrorMessage } from './lib/error-message/error-message';
export { LoadingSpinner } from './lib/loading-spinner/loading-spinner';
export { ProductGrid } from './lib/product-grid/product-grid';
export { SocialInteractions } from './lib/socialInteractions/SocialInteractions';
export { StarRating } from './lib/stars/Star';
export { MoreInfoText } from './lib/typography/MoreInfoText';
export * from './lib/typography/Typography';
// Form components
export { FormCheckbox } from './lib/forms/components/checkbox/FormCheckbox';
export type { FormCheckboxProps } from './lib/forms/components/checkbox/FormCheckbox';
export { FieldWrapper } from './lib/forms/components/FieldWrappper';
export type { FieldWrapperProps } from './lib/forms/components/FieldWrappper';
export { FormInput } from './lib/forms/components/input/FormInput';
export type { FormInputProps } from './lib/forms/components/input/FormInput';
export { SearchInput } from './lib/forms/components/search/Search';
export { FormSelect } from './lib/forms/components/select/FormSelect';
export type { FormSelectProps } from './lib/forms/components/select/FormSelect';
export { FormTextarea } from './lib/forms/components/textArea/FormTextarea';
export type { FormTextareaProps } from './lib/forms/components/textArea/FormTextarea';

// Form hooks
export { useAsyncFormSubmit } from './lib/forms/hooks/useAsyncFormSubmit';
export { useDebouncedValidation } from './lib/forms/hooks/useDebouncedValidation';
export { useFormAutoSave } from './lib/forms/hooks/useFormAutoSave';
export { useMultiStepForm } from './lib/forms/hooks/useMultiStepForm';
export { useZodForm } from './lib/forms/hooks/useZodForm';
// Form utils
export { CommonSchemas } from './lib/forms/utils/commonSchemaBuilders';
export * from './lib/forms/utils/formHelpers';
export { ValidationMessages } from './lib/forms/utils/validationsMessages';

//modals
export { SuggestionSearch } from './lib/modals/command/SuggestionSearch';

// nav
export { NavMenuWrapper } from './lib/nav/navMenuWrapper';
export { NavListItem } from './lib/nav/NavListItem';
export type {
  NavItemProps,
  NavigationMenuProps,
} from './lib/nav/navMenuWrapper';

// shadcn/ui utilities
export { cn } from './lib/utils';

// Hooks
export { useMedia } from './lib/hooks/use-media';
export { useIsMobile } from './lib/hooks/use-mobile';
export { useUserCurrency } from './lib/hooks/useCurrency';

// shadcn/ui components
export { Button, buttonVariants } from './lib/ui/button';
export { Checkbox } from './lib/ui/checkbox';
export { Combobox } from './lib/ui/combobox';
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './lib/ui/command';
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from './lib/ui/form';
export { Input } from './lib/ui/input';
export { Label } from './lib/ui/label';
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './lib/ui/navigation-menu';
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from './lib/ui/popover';
export { Separator } from './lib/ui/separator';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './lib/ui/sheet';
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './lib/ui/sidebar';
export { Skeleton } from './lib/ui/skeleton';
export { Textarea } from './lib/ui/textarea';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './lib/ui/tooltip';

// Carousel components
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './lib/ui/carousel';

// HoverCard components
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './lib/ui/hover-card';

// Item
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './lib/ui/item';
