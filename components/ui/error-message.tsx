'use client';

import { AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './button';
import type { ApiError } from '@/lib/errors/error-handler';
import { formatErrorMessage, getErrorDetails, isNetworkError } from '@/lib/errors/error-handler';

interface ErrorMessageProps {
  error: ApiError | Error | unknown;
  onDismiss?: () => void;
  showDetails?: boolean;
  className?: string;
}

/**
 * Алдааны мэдээллийг хэрэглэгчдэд харуулах component
 */
export function ErrorMessage({
  error,
  onDismiss,
  showDetails = false,
  className = '',
}: ErrorMessageProps) {
  const message = formatErrorMessage(error);
  const details = getErrorDetails(error);
  const isNetwork = isNetworkError(error);

  // Validation алдаануудыг харуулах
  const validationErrors =
    error && typeof error === 'object' && 'details' in error
      ? (error as ApiError).details?.validationErrors
      : null;

  return (
    <div
      className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${
        className || ''
      }`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
            {isNetwork ? 'Сүлжээний алдаа' : 'Алдаа гарлаа'}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>

          {/* Validation алдаанууд */}
          {validationErrors && Array.isArray(validationErrors) && (
            <ul className="mt-2 list-disc list-inside text-sm text-red-600 dark:text-red-400">
              {validationErrors.map((err: string, index: number) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}

          {/* Дэлгэрэнгүй мэдээлэл (development) */}
          {showDetails && details && (
            <details className="mt-3">
              <summary className="text-xs text-red-600 dark:text-red-400 cursor-pointer hover:underline">
                Дэлгэрэнгүй мэдээлэл
              </summary>
              <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-auto max-h-40">
                {details}
              </pre>
            </details>
          )}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Инлайн алдааны мэдээлэл (жижиг хэмжээтэй)
 */
export function InlineError({ error, className = '' }: { error: string | null; className?: string }) {
  if (!error) return null;

  return (
    <p className={`text-sm text-red-600 dark:text-red-400 mt-1 ${className}`}>
      <AlertCircle className="inline w-4 h-4 mr-1" />
      {error}
    </p>
  );
}

/**
 * Амжилтгүй алдааны хуудас (404, 500 гэх мэт)
 */
interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorPage({
  statusCode,
  title,
  message,
  actionLabel = 'Нүүр хуудас',
  onAction,
}: ErrorPageProps) {
  const defaultTitle = statusCode === 404 ? 'Хуудас олдсонгүй' : 'Алдаа гарлаа';
  const defaultMessage =
    statusCode === 404
      ? 'Уучлаарай, таны хайсан хуудас олдсонгүй.'
      : 'Серверийн алдаа гарлаа. Дараа дахин оролдоно уу.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-red-500 dark:text-red-400 mb-4">
          {statusCode || '⚠️'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title || defaultTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message || defaultMessage}</p>
        <Button
          onClick={onAction || (() => (window.location.href = '/'))}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

