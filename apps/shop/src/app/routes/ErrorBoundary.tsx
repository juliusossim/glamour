/**
 * Route Error Boundary
 *
 * Handles errors thrown by loaders and components.
 * Uses Tailwind CSS for styling.
 */

import { useConfig } from '@org/shared-config';
import { ErrorMessage } from '@org/shared-ui';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import glamourLoaderTransparent from '../../assets/glamour_loader_transparent.gif';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { mode } = useConfig();

  let message = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        message = 'The page you are looking for does not exist.';
        break;
      case 401:
        message = 'You need to be logged in to access this page.';
        break;
      case 403:
        message = 'You do not have permission to access this page.';
        break;
      case 500:
        message = 'Something went wrong on our end. Please try again later.';
        break;
      default:
        message = error.statusText || 'An error occurred.';
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  const handleRetry = () => {
    navigate(0); // Refresh current route
  };

  const handleGoHome = () => {
    navigate('/products');
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-8 w-full">
      <div className="w-full">
        <ErrorMessage
          message={message}
          onRetry={handleRetry}
          goBack={handleGoHome}
          classes="bg-gold-gradient"
          imageAlt="Glamour loading emblem"
          imageSrc={glamourLoaderTransparent}
        />

        {mode === 'development' && error instanceof Error && (
          <details className="mt-8 rounded-lg bg-slate-50 p-4 text-left">
            <summary className="cursor-pointer font-medium text-slate-600">
              Error Details
            </summary>
            <pre className="mt-4 overflow-x-auto rounded bg-slate-800 p-4 text-xs text-slate-200">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default RouteErrorBoundary;
