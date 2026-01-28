/**
 * Route Error Boundary
 *
 * Handles errors thrown by loaders and components.
 * Uses Tailwind CSS for styling.
 */

import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred.';
  let status: number | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        title = 'Page Not Found';
        message = 'The page you are looking for does not exist.';
        break;
      case 401:
        title = 'Unauthorized';
        message = 'You need to be logged in to access this page.';
        break;
      case 403:
        title = 'Forbidden';
        message = 'You do not have permission to access this page.';
        break;
      case 500:
        title = 'Server Error';
        message = 'Something went wrong on our end. Please try again later.';
        break;
      default:
        title = `Error ${error.status}`;
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
    <div className="flex min-h-[50vh] items-center justify-center p-8">
      <div className="max-w-md text-center">
        {status && (
          <div className="mb-4 text-8xl font-bold leading-none text-slate-200">
            {status}
          </div>
        )}
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mb-8 text-slate-500">{message}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleRetry}
            className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="rounded-lg border border-indigo-500 bg-white px-6 py-3 font-medium text-indigo-500 transition-colors hover:bg-slate-50"
          >
            Go to Products
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error instanceof Error && (
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
