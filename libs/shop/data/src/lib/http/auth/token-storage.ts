/**
 * Token Storage Utility
 * 
 * Uses sessionStorage by default (cleared when browser closes).
 * Can switch to localStorage for "Remember Me" functionality.
 * 
 * Security Benefits of sessionStorage:
 * - Tokens are automatically cleared when the browser/tab closes
 * - Reduces risk of XSS token theft persisting across sessions
 * - No cross-tab sharing (each tab has its own session)
 */

const TOKEN_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  rememberMe: 'rememberMe',
} as const;

const isBrowser = globalThis.window !== undefined;

/**
 * Get the appropriate storage based on "Remember Me" preference
 */
function getStorage(): Storage | null {
  if (!isBrowser) return null;
  
  // Check if user opted for persistent storage
  const rememberMe = localStorage.getItem(TOKEN_KEYS.rememberMe) === 'true';
  return rememberMe ? localStorage : sessionStorage;
}

/**
 * Token storage service for managing authentication tokens
 */
export const tokenStorage = {
  /**
   * Get the access token
   */
  getAccessToken(): string | null {
    if (!isBrowser) return null;
    
    // Check both storages (sessionStorage first, then localStorage for persistence)
    return (
      sessionStorage.getItem(TOKEN_KEYS.accessToken) ||
      localStorage.getItem(TOKEN_KEYS.accessToken)
    );
  },

  /**
   * Get the refresh token
   */
  getRefreshToken(): string | null {
    if (!isBrowser) return null;
    
    return (
      sessionStorage.getItem(TOKEN_KEYS.refreshToken) ||
      localStorage.getItem(TOKEN_KEYS.refreshToken)
    );
  },

  /**
   * Store authentication tokens
   * @param accessToken - The access token
   * @param refreshToken - The refresh token
   * @param rememberMe - If true, use localStorage for persistence
   */
  setTokens(
    accessToken: string,
    refreshToken: string,
    rememberMe = false
  ): void {
    if (!isBrowser) return;

    // Store the remember me preference
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEYS.rememberMe, 'true');
    } else {
      localStorage.removeItem(TOKEN_KEYS.rememberMe);
    }

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEYS.accessToken, accessToken);
    storage.setItem(TOKEN_KEYS.refreshToken, refreshToken);

    // Clear from the other storage to avoid conflicts
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem(TOKEN_KEYS.accessToken);
    otherStorage.removeItem(TOKEN_KEYS.refreshToken);
  },

  /**
   * Update just the access token (after refresh)
   */
  updateAccessToken(accessToken: string): void {
    if (!isBrowser) return;
    
    const storage = getStorage();
    if (storage) {
      storage.setItem(TOKEN_KEYS.accessToken, accessToken);
    }
  },

  /**
   * Clear all tokens from both storages
   */
  clearTokens(): void {
    if (!isBrowser) return;

    // Clear from both storages
    sessionStorage.removeItem(TOKEN_KEYS.accessToken);
    sessionStorage.removeItem(TOKEN_KEYS.refreshToken);
    localStorage.removeItem(TOKEN_KEYS.accessToken);
    localStorage.removeItem(TOKEN_KEYS.refreshToken);
    localStorage.removeItem(TOKEN_KEYS.rememberMe);
  },

  /**
   * Check if user is authenticated (has a token)
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  /**
   * Check if "Remember Me" is enabled
   */
  isRememberMeEnabled(): boolean {
    if (!isBrowser) return false;
    return localStorage.getItem(TOKEN_KEYS.rememberMe) === 'true';
  },
};
