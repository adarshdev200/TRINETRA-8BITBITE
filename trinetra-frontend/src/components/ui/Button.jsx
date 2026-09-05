import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-primary text-dark hover:bg-primary-dark disabled:opacity-50',
    secondary: 'bg-dark-elevated text-gray-200 hover:bg-[#1E2632] border border-[rgba(255,255,255,0.08)]',
    danger: 'bg-critical text-white hover:bg-red-700',
    success: 'bg-success text-white hover:bg-green-600',
    ghost: 'text-gray-400 hover:text-white hover:bg-dark-elevated',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          (loading || disabled) && 'opacity-50 cursor-not-allowed',
          className
        )
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};