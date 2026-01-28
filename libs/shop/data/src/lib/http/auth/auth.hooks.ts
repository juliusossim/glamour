import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { tokenStorage } from './token-storage';
import type {
    ChangePasswordRequest,
    LoginCredentials,
    RegisterCredentials,
    ResetPasswordConfirm,
    ResetPasswordRequest,
    UpdateProfileRequest
} from './auth.types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get the current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    enabled: tokenStorage.isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

/**
 * Hook for user login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      credentials,
      rememberMe = false,
    }: {
      credentials: LoginCredentials;
      rememberMe?: boolean;
    }) => authApi.login(credentials, rememberMe),
    onSuccess: (data) => {
      // Update the user in cache
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      credentials,
      rememberMe = false,
    }: {
      credentials: RegisterCredentials;
      rememberMe?: boolean;
    }) => authApi.register(credentials, rememberMe),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      // Optionally clear all cache
      queryClient.clear();
    },
  });
}

/**
 * Hook for forgot password
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.forgotPassword(data),
  });
}

/**
 * Hook for reset password
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordConfirm) => authApi.resetPassword(data),
  });
}

/**
 * Hook for change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
  });
}

/**
 * Hook for update profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(authKeys.user(), updatedUser);
    },
  });
}

/**
 * Hook for email verification
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
  });
}

/**
 * Hook for resending verification email
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: authApi.resendVerification,
  });
}

/**
 * Hook for refreshing the access token
 */
export function useRefreshToken() {
  return useMutation({
    mutationFn: authApi.refreshToken,
  });
}
