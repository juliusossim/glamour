import { LoadingSpinner } from '@org/shared-ui';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import glamourLoaderTransparent from '../assets/glamour_loader_transparent.gif';
export function App() {
  return (
    <RouterProvider
      fallbackElement={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner
            title="Loading..."
            message="Please wait while we load the content."
            imageUrl={glamourLoaderTransparent}
          />
        </div>
      }
      router={router}
    />
  );
}

export default App;
