import { Button } from '../ui/button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = 'An error occurred. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[200px] text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="text-destructive text-lg mb-6 max-w-[400px]">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;