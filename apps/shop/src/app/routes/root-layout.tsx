/**
 * Root Layout Component
 *
 * Main layout wrapper with header, navigation, and outlet for child routes.
 * Uses Tailwind CSS for styling.
 */

import { LoadingSpinner } from '@org/shop-shared-ui';
import { Suspense } from 'react';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-4 shadow-md md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-semibold text-white md:text-2xl">
           Glamour And Large
          </h1>
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-7xl flex-1 p-4 md:p-8">
        {isNavigating && (
          <div className="absolute inset-x-0 top-0 z-50 bg-white/80 p-2 text-center">
            <LoadingSpinner />
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </section>

      <ScrollRestoration />
    </div>
  );
}

export default RootLayout;
