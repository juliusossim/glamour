import { ErrorMessageProps } from '@org/models';
import { Button } from '../ui/button';
import { Item, ItemContent, ItemTitle } from '../ui/item';


export function ErrorMessage({
  message = 'An error occurred. Please try again.',
  onRetry,
  children,
}: Readonly<ErrorMessageProps>) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-50 text-center">
     {children || (<Item variant="muted">
        <ItemContent>
          <ItemTitle className="text-lg font-medium tracking-tight">{message}</ItemTitle>
        </ItemContent>
      </Item>)}
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;