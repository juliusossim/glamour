import { httpClient } from '../http-client';
import type {
    AuthResponse,
    AuthTokens,
    ChangePasswordRequest,
    LoginCredentials,
    RegisterCredentials,
    ResetPasswordConfirm,
    ResetPasswordRequest,
    UpdateProfileRequest,
    User,
} from './auth.types';
import { tokenStorage } from './token-storage';

const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  me: '/auth/me',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  changePassword: '/auth/change-password',
  updateProfile: '/auth/profile',
  verifyEmail: '/auth/verify-email',
  resendVerification: '/auth/resend-verification',
};

export const authApi = {
  /**
   * Login with email and password
   * @param credentials - User credentials
   * @param rememberMe - If true, persist tokens across browser sessions
   */
  login: async (
    credentials: LoginCredentials,
    rememberMe = false
  ): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      AUTH_ENDPOINTS.login,
      credentials
    );

    // Store tokens (sessionStorage by default, localStorage if rememberMe)
    tokenStorage.setTokens(
      response.tokens.accessToken,
      response.tokens.refreshToken,
      rememberMe
    );

    return response;
  },

  /**
   * Register a new user
   * @param credentials - Registration data
   * @param rememberMe - If true, persist tokens across browser sessions
   */
  register: async (
    credentials: RegisterCredentials,
    rememberMe = false
  ): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      AUTH_ENDPOINTS.register,
      credentials
    );

    // Store tokens (sessionStorage by default)
    tokenStorage.setTokens(
      response.tokens.accessToken,
      response.tokens.refreshToken,
      rememberMe
    );

    return response;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    try {
      await httpClient.post(AUTH_ENDPOINTS.logout);
    } finally {
      // Always clear tokens from both storages
      tokenStorage.clearTokens();
    }
  },

  /**
   * Refresh the access token
   */
  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await httpClient.post<AuthTokens>(AUTH_ENDPOINTS.refresh, {
      refreshToken,
    });

    // Update stored tokens (preserves the rememberMe preference)
    tokenStorage.setTokens(
      response.accessToken,
      response.refreshToken,
      tokenStorage.isRememberMeEnabled()
    );

    return response;
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    return httpClient.get<User>(AUTH_ENDPOINTS.me);
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.forgotPassword, data);
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordConfirm): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.resetPassword, data);
  },

  /**
   * Change password for authenticated user
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.changePassword, data);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    return httpClient.patch<User>(AUTH_ENDPOINTS.updateProfile, data);
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.verifyEmail, { token });
  },

  /**
   * Resend verification email
   */
  resendVerification: async (): Promise<void> => {
    await httpClient.post(AUTH_ENDPOINTS.resendVerification);
  },
};
