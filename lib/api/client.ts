/**
 * API client with automatic JWT token injection
 */

import { getToken, removeToken } from '@/lib/auth/token';
import type { ApiError } from '@/lib/errors/error-handler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type { ApiError };

/**
 * Custom fetch wrapper that automatically adds JWT token to requests
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - token might be expired
    if (response.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `Server error: ${response.status}`,
        statusCode: response.status,
      }));
      
      // Backend-оос ирсэн алдааны форматыг боловсруулах
      const error: ApiError = {
        message: errorData.error || errorData.message || `Server error: ${response.status}`,
        status: errorData.statusCode || response.status,
        details: errorData.details,
        path: errorData.path,
        method: errorData.method,
        timestamp: errorData.timestamp,
      };
      throw error;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error: unknown) {
    // Authentication алдаа - дахин throw хийх
    if (error instanceof Error && error.message === 'Authentication required') {
      throw error;
    }

    // Fetch алдаа (сүлжээний асуудал)
    if (error instanceof TypeError && error.message?.includes('fetch')) {
      throw {
        message: 'Сүлжээний холболт алдаатай. Интернэт холболтоо шалгана уу.',
        status: 0,
        details: { originalError: error.message },
      } as ApiError;
    }

    // Аль хэдийн ApiError бол дахин throw
    if (error && typeof error === 'object' && 'status' in error) {
      throw error;
    }

    // Бусад алдаанууд
    const errorMessage = error instanceof Error ? error.message : 'Алдаа гарлаа. Дараа дахин оролдоно уу.';
    throw {
      message: errorMessage,
      status: 0,
      details: { originalError: errorMessage },
    } as ApiError;
  }
}

/**
 * GET request
 */
export function apiGet<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST request
 */
export function apiPost<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 */
export function apiPatch<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export function apiPut<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export function apiDelete<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

