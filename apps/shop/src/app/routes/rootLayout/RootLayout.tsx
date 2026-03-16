/**
 * Root Layout Component
 *
 * Main layout wrapper with header, navigation, and outlet for child routes.
 * Uses Tailwind CSS for styling.
 */

import { LoadingSpinner } from '@org/shared-ui';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import DisplayWidth from './DisplayWidth';
import Topbar from './Topbar';

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <main className="flex min-h-screen flex-col">
      {/* Responsive Header */}
      <header className="sticky top-0 z-40 w-full ">
        <AnnouncementBar />
        <Topbar />
        {/* Mobile menu button placeholder */}
        <nav className="hidden sm:flex items-center gap-4 md:gap-6">
          {/* Navigation links can go here */}
        </nav>
        {/* </div> */}
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
        <article>
          <DisplayWidth>
            <Outlet />
          </DisplayWidth>
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
