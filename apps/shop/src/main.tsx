import { createConfig } from '@org/shared-config';
import {
  ApolloProviderWrapper,
  QueryProvider,
  StoreProvider,
} from '@org/shared-data';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { shopEnv } from './env';
import './styles.css';
import App from './app/app';

// Initialize runtime config for the shop app (injected at bootstrap)
createConfig({
  apiBaseUrl: shopEnv.apiBaseUrl,
  mode: shopEnv.mode,
  buildNumber: shopEnv.buildNumber,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryProvider>
      <ApolloProviderWrapper>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ApolloProviderWrapper>
    </QueryProvider>
  </StrictMode>
);
