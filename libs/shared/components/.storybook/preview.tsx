import { ApolloProviderWrapper, QueryProvider } from '@org/shop-data';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

// Import Tailwind CSS styles
import './styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryProvider>
        <ApolloProviderWrapper>
          <Story />
        </ApolloProviderWrapper>
      </QueryProvider>
    ),
  ],
};

export default preview;
