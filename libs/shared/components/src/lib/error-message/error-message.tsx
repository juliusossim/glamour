import { ErrorMessageProps } from '@org/models';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import MoreInfoText from '../typography/MoreInfoText';
import { SmallText } from '../typography/Typography';
import { Button } from '../ui/button';
import { Item, ItemContent, ItemTitle } from '../ui/item';

export function ErrorMessage({
  message = 'An error occurred. Please try again.',
  onRetry,
  goBack,
  children,
  classes,
  imageAlt = 'Error illustration',
  imageSrc,
}: Readonly<ErrorMessageProps>) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center min-h-50 text-center bg-gold  ${classes}`}
    >
      <div className="max-w-1/2 flex flex-col gap-4 items-center">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-28 w-28 object-contain"
          />
        )}
        {children || (
          <Item variant="default">
            <ItemContent>
              <ItemTitle className="text-lg font-medium tracking-tight">
                {message}
              </ItemTitle>
            </ItemContent>
          </Item>
        )}
        <div className="flex justify-between w-full">
          {onRetry && (
            <MoreInfoText
              title={
                <Button
                  onClick={onRetry}
                  variant="secondary"
                  aria-label="Retry"
                >
                  <RefreshCcw color="black" size={16} />
                </Button>
              }
              content="Retry"
            >
              <SmallText className="text-indigo-400 text-xs">
                Try again
              </SmallText>
            </MoreInfoText>
          )}
          {goBack && (
            <MoreInfoText
              title={
                <Button
                  onClick={goBack}
                  variant="secondary"
                  aria-label="Go Back"
                >
                  <ArrowLeft color="black" size={16} />
                </Button>
              }
              content="Go Back"
            >
              <SmallText className="text-indigo-400 text-xs">
                Return to safety
              </SmallText>
            </MoreInfoText>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
