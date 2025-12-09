/**
 * Алдаа боловсруулах utility функцууд
 */

export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, any>;
  path?: string;
  method?: string;
  timestamp?: string;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public details?: Record<string, any>,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * API алдааг хэрэглэгчид ойлгомжтой мессеж болгон хувиргах
 */
export function formatErrorMessage(error: ApiError | Error | unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const apiError = error as ApiError;

    // Тодорхой статус кодуудын төлөө ойлгомжтой мессеж
    switch (apiError.status) {
      case 400:
        return apiError.message || 'Хүсэлт буруу байна';
      case 401:
        return 'Нэвтрэх эрх шаардлагатай';
      case 403:
        return 'Хандах эрхгүй байна';
      case 404:
        return apiError.message || 'Хуудас олдсонгүй';
      case 409:
        return apiError.message || 'Өгөгдөл зөрчилтэй байна';
      case 422:
        return apiError.message || 'Баталгаажуулалтын алдаа';
      case 500:
        return 'Серверийн алдаа гарлаа. Дараа дахин оролдоно уу.';
      case 503:
        return 'Сервер завгүй байна. Дараа дахин оролдоно уу.';
      default:
        return apiError.message || 'Алдаа гарлаа. Дараа дахин оролдоно уу.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Тодорхойгүй алдаа гарлаа. Дараа дахин оролдоно уу.';
}

/**
 * Алдааны детайлуудыг гаргах (development орчинд л)
 */
export function getErrorDetails(error: ApiError | Error | unknown): string | null {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (error && typeof error === 'object' && 'details' in error) {
    const apiError = error as ApiError;
    if (apiError.details) {
      return JSON.stringify(apiError.details, null, 2);
    }
  }

  if (error instanceof Error && error.stack) {
    return error.stack;
  }

  return null;
}

/**
 * Сүлжээний алдаа эсэхийг шалгах
 */
export function isNetworkError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    return apiError.status === 0 || apiError.status === undefined;
  }
  return false;
}

