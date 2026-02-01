import { ApolloProviderWrapper } from '@org/shop-data';
import type { Preview } from '@storybook/react';
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
    (Story) => React.createElement(ApolloProviderWrapper, null, React.createElement(Story)),
  ],
};

export default preview;
