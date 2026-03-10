/**
 * Root Layout Component
 *
 * Main layout wrapper with header, navigation, and outlet for child routes.
 * Uses Tailwind CSS for styling.
 */

import { LoadingSpinner } from '@org/shared-ui';
import { Suspense } from 'react';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <main className="flex min-h-screen flex-col">
      {/* Responsive Header */}
      <header className="sticky top-0 z-40 w-full bg-gold-gradient shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <h1 className="text-lg font-semibold text-primary-foreground sm:text-xl md:text-2xl lg:text-3xl">
            Glamour And Large
          </h1>
          {/* Mobile menu button placeholder */}
          <nav className="hidden sm:flex items-center gap-4 md:gap-6">
            {/* Navigation links can go here */}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="relative flex-1 w-full flex justify-center">
        {/* Navigation Loading Indicator */}
        {isNavigating && (
          <div className="absolute inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm p-2 text-center">
            <LoadingSpinner />
          </div>
        )}

        {/* Content Container */}
        <article className="w-full max-w-7xl px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14 flex flex-col items-center sm:items-start">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </article>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8">
          <p className="text-center text-xs text-muted-foreground sm:text-sm">
            © 2026 Glamour And Large. All rights reserved.
          </p>
        </div>
      </footer>

      <ScrollRestoration />
    </main>
  );
}

export default RootLayout;
