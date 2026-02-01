import { TruncatedTextProps, type TypographyProps } from '@org/models';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { alignStyles, cn, colorStyles, lineClampStyles, variantElements, variantStyles, weightStyles } from '../utils';

// ============================================================================
// Component
// ============================================================================

/**
 * Typography component for consistent text styling across the application.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1">Body text</Typography>
 *
 * // With truncation (single line)
 * <Typography truncate>Very long text that will be truncated...</Typography>
 *
 * // With multi-line truncation
 * <Typography lineClamp={2}>
 *   Long text that will be truncated after 2 lines...
 * </Typography>
 *
 * // Custom element
 * <Typography variant="body1" as="span">Span instead of p</Typography>
 *
 * // Styled
 * <Typography variant="h2" color="primary" weight="bold" align="center">
 *   Styled Heading
 * </Typography>
 * ```
 */
export function Typography({
  variant = 'body1',
  as,
  weight,
  align,
  color = 'default',
  truncate = false,
  lineClamp,
  noWrap = false,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? variantElements[variant];

  const classes = cn(
    // Base variant styles
    variantStyles[variant],
    // Color (only apply if not inherit)
    color && colorStyles[color],
    // Weight (override variant default if specified)
    weight && weightStyles[weight],
    // Alignment
    align && alignStyles[align],
    // Truncation options
    truncate && 'truncate',
    lineClamp && lineClampStyles[lineClamp],
    noWrap && 'whitespace-nowrap',
    // Custom classes
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

// ============================================================================
// Convenience Components
// ============================================================================

type VariantOmittedProps = Readonly<Omit<TypographyProps, 'variant'>>;

/** Heading 1 */
export function H1(props: VariantOmittedProps) {
  return <Typography variant="h1" {...props} />;
}

/** Heading 2 */
export function H2(props: VariantOmittedProps) {
  return <Typography variant="h2" {...props} />;
}

/** Heading 3 */
export function H3(props: VariantOmittedProps) {
  return <Typography variant="h3" {...props} />;
}

/** Heading 4 */
export function H4(props: VariantOmittedProps) {
  return <Typography variant="h4" {...props} />;
}

/** Body text (default) */
export function Text(props: VariantOmittedProps) {
  return <Typography variant="body1" {...props} />;
}

/** Small body text */
export function SmallText(props: VariantOmittedProps) {
  return <Typography variant="body2" {...props} />;
}

/** Caption text */
export function Caption(props: VariantOmittedProps) {
  return <Typography variant="caption" {...props} />;
}

/** Label text */
export function Label(props: VariantOmittedProps) {
  return <Typography variant="label" {...props} />;
}

// ============================================================================
// Truncated Text Component (with styled tooltip on hover)
// ============================================================================

/**
 * Text component that truncates and shows full text in a styled tooltip on hover.
 *
 * @example
 * ```tsx
 * <TruncatedText
 *   text="Very long product description that needs to be truncated"
 *   maxWidth="200px"
 * />
 *
 * // With multi-line clamp
 * <TruncatedText
 *   text="Long text that spans multiple lines..."
 *   lineClamp={2}
 * />
 *
 * // Disable tooltip (just truncate)
 * <TruncatedText
 *   text="Truncated without tooltip"
 *   showTooltip={false}
 * />
 * ```
 */
export function TruncatedText({
  text,
  maxWidth,
  className,
  lineClamp,
  showTooltip = true,
  tooltipSide = 'top',
  ...props
}: TruncatedTextProps) {
  const content = (
    <Typography
      {...props}
      truncate={!lineClamp}
      lineClamp={lineClamp}
      className={cn('cursor-default', className)}
      style={{ maxWidth, ...props.style }}
    >
      {text}
    </Typography>
  );

  if (!showTooltip) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {content}
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} className="max-w-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
