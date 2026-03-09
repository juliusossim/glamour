/**
 * Route Actions
 *
 * Form actions for React Router data APIs.
 * Handle form submissions and mutations.
 */

import type { ActionFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { tokenStorage } from '../http/auth/token-storage';
import { ROUTE_PATHS } from './routes';

const API_URL = 'http://localhost:3333/api';

// Action error type
export class ActionError extends Error {
  constructor(
    message: string,
    public status = 400,
    public fieldErrors?: Record<string, string>
  ) {
    super(message);
    this.name = 'ActionError';
  }
}

// Action response type for forms
export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Login action
 */
export async function loginAction({
  request,
}: ActionFunctionArgs): Promise<ActionResponse | Response> {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') === 'true';
  const redirectTo = formData.get('redirectTo') as string | null;

  // Validate
  const fieldErrors: Record<string, string> = {};
  if (!email) fieldErrors['email'] = 'Email is required';
  if (!password) fieldErrors['password'] = 'Password is required';

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Validation failed', fieldErrors };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }

    const data = await response.json();

    // Store tokens
    tokenStorage.setTokens(
      data.tokens.accessToken,
      data.tokens.refreshToken,
      rememberMe
    );

    // Redirect to the original URL or products page
    return redirect(redirectTo || ROUTE_PATHS.PRODUCTS);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
}

/**
 * Logout action
 */
export async function logoutAction(): Promise<Response> {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
      },
    });
  } catch {
    // Ignore errors during logout
  } finally {
    tokenStorage.clearTokens();
  }

  return redirect(ROUTE_PATHS.LOGIN);
}

/**
 * Register action
 */
export async function registerAction({
  request,
}: ActionFunctionArgs): Promise<ActionResponse | Response> {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const name = formData.get('name') as string;
  const rememberMe = formData.get('rememberMe') === 'true';

  // Validate
  const fieldErrors: Record<string, string> = {};
  if (!email) fieldErrors['email'] = 'Email is required';
  if (!password) fieldErrors['password'] = 'Password is required';
  if (!confirmPassword)
    fieldErrors['confirmPassword'] = 'Please confirm your password';
  if (password !== confirmPassword)
    fieldErrors['confirmPassword'] = 'Passwords do not match';
  if (!name) fieldErrors['name'] = 'Name is required';

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Validation failed', fieldErrors };
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }

    const data = await response.json();

    // Store tokens
    tokenStorage.setTokens(
      data.tokens.accessToken,
      data.tokens.refreshToken,
      rememberMe
    );

    return redirect(ROUTE_PATHS.PRODUCTS);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
}

/**
 * Add to cart action
 */
export async function addToCartAction({
  request,
}: ActionFunctionArgs): Promise<ActionResponse> {
  const formData = await request.formData();
  const productId = formData.get('productId') as string;
  const quantity = Number.parseInt(formData.get('quantity') as string, 10) || 1;

  if (!productId) {
    return { success: false, error: 'Product ID is required' };
  }

  // For now, return success as cart is handled client-side with Redux
  // In a real app, you might sync with a server cart here
  return {
    success: true,
    data: { productId, quantity },
  };
}
